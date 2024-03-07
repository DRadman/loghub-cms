import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AccessDeniedComponent } from '../access-denied/access-denied.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/state/app.state';
import { Project } from '../../../core/domain/models/project.entity';
import { ProjectDebugFile } from '../../../core/domain/models/project-debug-file.entity';
import {
  isLoadingSingleProjectAddDebugFile,
  isLoadingSingleProjectDebugFiles,
  isLoadingSingleProjectRemoveDebugFiles,
  selectAddProjectDebugFileStatus,
  selectRemoveProjectDebugFilesStatus,
  selectSingleProjectDebugFiles,
} from '../../../core/state/single-project/single-project.selectors';
import { filter, map, take } from 'rxjs';
import { selectHasPermission } from '../../../core/state/auth/auth.selectors';
import { ResourceType } from '../../../core/domain/models/enums/resource-type.enum';
import { Permission } from '../../../core/domain/models/enums/permission.enum';
import {
  addProjectDebugFile,
  loadProjectDebugFiles,
  removeProjectDebugFiles,
} from '../../../core/state/single-project/single-project.actions';
import { StateStatus } from '../../../core/domain/models/enums/state-status.enum';
import { DebugFileType } from '../../../core/domain/models/enums/debug-file-type.enum';
import { CreateProjectDebugFileDto } from '../../../core/domain/dto/requests/create-project-debug-file.dto';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { ProjectService } from '../../../core/services/api/project.api.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-debug-files-table',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    TableModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    AccessDeniedComponent,
    DropdownModule,
    InputGroupModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './debug-files-table.component.html',
  styleUrl: './debug-files-table.component.scss',
})
export class DebugFilesTableComponent implements OnInit {
  private platformId;
  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
    private messageService: MessageService,
    private projectService: ProjectService,
  ) {
    this.platformId = inject(PLATFORM_ID);
  }

  @ViewChild('dt') dt: Table | undefined;

  @Input()
  project?: Project;

  @Input()
  enablePagination: boolean = true;

  @Input()
  enableGlobalSearch: boolean = true;

  @Input()
  enableFiltering: boolean = true;

  @Input()
  enableSorting: boolean = true;

  @Input()
  enableAddAction: boolean = false;

  @Input()
  enableEditAction: boolean = false;

  @Input()
  enableRemoveAction: boolean = false;

  createDebugFileForm = this.formBuilder.group({
    type: [DebugFileType.UNKNOWN, [Validators.required]],
    file: [undefined, [Validators.required]],
  });
  isAddNewDialogVisible: boolean = false;

  selectedDebugFiles: ProjectDebugFile[] = [];
  debugFiles = this.store
    .select(selectSingleProjectDebugFiles)
    .pipe(map((files) => [...(files ?? [])]));
  isLoadingDebugFiles = this.store.select(isLoadingSingleProjectDebugFiles);
  isLoadingCreateNew = this.store.select(isLoadingSingleProjectAddDebugFile);
  isLoadingRemoveDebugFiles = this.store.select(
    isLoadingSingleProjectRemoveDebugFiles,
  );
  hasReadPermission = this.store.select(
    selectHasPermission(ResourceType.PROJECT, Permission.READ),
  );

  types = Object.values(DebugFileType);

  ngOnInit(): void {
    this.store.dispatch(
      loadProjectDebugFiles({ projectId: this.project?.projectId ?? '' }),
    );
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showDeleteConfirmation(debugFileId: string, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translateService.instant(
        'debug-files-table.delete_confirmation_message',
      ),
      header: this.translateService.instant(
        'debug-files-table.delete_confirmation',
      ),
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.removeDebugFiles([debugFileId]);
      },
      reject: () => {},
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showDeleteSelectionConfirmation(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translateService.instant(
        'debug-files-table.delete_confirmation_message',
      ),
      header: this.translateService.instant(
        'debug-files-table.delete_confirmation',
      ),
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.removeDebugFiles(
          this.selectedDebugFiles.map((value) => value.debugFileId),
        );
      },
      reject: () => {},
    });
  }

  showAddDialog() {
    this.resetDebugFilesForm();
    this.isAddNewDialogVisible = true;
  }

  createNewDebugFile() {
    const dto: CreateProjectDebugFileDto = {
      type:
        this.createDebugFileForm.get('type')?.value ?? DebugFileType.UNKNOWN,
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      file: this.createDebugFileForm.get('file')?.value!,
    };
    this.store.dispatch(
      addProjectDebugFile({
        projectId: this.project?.projectId ?? '',
        dto: dto,
      }),
    );
    this.store
      .select(selectAddProjectDebugFileStatus)
      .pipe(
        filter(
          (status) =>
            status == StateStatus.ERROR || status == StateStatus.SUCCESS,
        ),
        take(1), // unsubscribe after one emitted value
      )
      .subscribe((status) => {
        if (status && status == StateStatus.ERROR) {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('debug-files-table.error'),
            detail: this.translateService.instant(
              'debug-files-table.failed_to_create_file',
            ),
          });
        } else if (status && status == StateStatus.SUCCESS) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('debug-files-table.success'),
            detail: this.translateService.instant(
              'debug-files-table.file_created',
            ),
          });
          this.isAddNewDialogVisible = !this.isAddNewDialogVisible;
        }
      });
  }

  onFilePicked(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.createDebugFileForm.get('file') as any)?.setValue(file);
    }
  }

  downloadFile(file: string, fileUrl: string) {
    this.projectService.downloadFile(fileUrl).subscribe((blob) => saveAs(blob, file))
  }

  private removeDebugFiles(ids: string[]) {
    this.store.dispatch(
      removeProjectDebugFiles({
        projectId: this.project?.projectId ?? '',
        ids: ids,
      }),
    );
    this.store
      .select(selectRemoveProjectDebugFilesStatus)
      .pipe(
        filter(
          (status) =>
            status == StateStatus.ERROR || status == StateStatus.SUCCESS,
        ),
        take(1), // unsubscribe after one emitted value
      )
      .subscribe((status) => {
        if (status && status == StateStatus.ERROR) {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('debug-files-table.error'),
            detail: this.translateService.instant(
              'debug-files-table.failed_to_delete_files',
            ),
          });
        } else if (status && status == StateStatus.SUCCESS) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('debug-files-table.success'),
            detail: this.translateService.instant(
              'debug-files-table.removed_files',
            ),
          });
          this.selectedDebugFiles = [];
        }
      });
  }

  private resetDebugFilesForm() {
    this.createDebugFileForm = this.formBuilder.group({
      type: [DebugFileType.UNKNOWN, [Validators.required]],
      file: [undefined, [Validators.required]],
    });
  }
}
