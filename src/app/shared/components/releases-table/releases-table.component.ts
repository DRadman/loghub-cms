import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Validators, FormBuilder } from '@angular/forms';
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
import { ProjectRelease } from '../../../core/domain/models/project-release.entity';
import { isLoadingSingleProjectAddRelease, isLoadingSingleProjectReleases, isLoadingSingleProjectRemoveReleases, selectAddProjectReleaseStatus, selectRemoveProjectReleasesStatus, selectSingleProjectReleases } from '../../../core/state/single-project/single-project.selectors';
import { filter, map, take } from 'rxjs';
import { selectHasPermission } from '../../../core/state/auth/auth.selectors';
import { ResourceType } from '../../../core/domain/models/enums/resource-type.enum';
import { Permission } from '../../../core/domain/models/enums/permission.enum';
import { addProjectRelease, loadProjectReleases, removeProjectReleases } from '../../../core/state/single-project/single-project.actions';
import { StateStatus } from '../../../core/domain/models/enums/state-status.enum';
import { CreateProjectReleaseDto } from '../../../core/domain/dto/requests/create-project-release.dto';

@Component({
  selector: 'app-releases-table',
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
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './releases-table.component.html',
  styleUrl: './releases-table.component.scss',
})
export class ReleasesTableComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
    private messageService: MessageService,
  ) {}

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

  createReleaseForm = this.formBuilder.group({
    version: ['', [Validators.required]],
  });
  isAddNewDialogVisible: boolean = false;

  selectedReleases: ProjectRelease[] = [];
  releases = this.store
    .select(selectSingleProjectReleases)
    .pipe(map((releases) => [...releases ?? []]));
  isLoadingReleases = this.store.select(isLoadingSingleProjectReleases);
  isLoadingCreateNew = this.store.select(isLoadingSingleProjectAddRelease);
  isLoadingRemoveReleases = this.store.select(isLoadingSingleProjectRemoveReleases);
  hasReadPermission = this.store.select(
    selectHasPermission(ResourceType.PROJECT, Permission.READ),
  );

  ngOnInit(): void {
    this.store.dispatch(
      loadProjectReleases({ projectId: this.project?.projectId ?? '' }),
    );
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showDeleteConfirmation(releaseId: string, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translateService.instant(
        'releases-table.delete_confirmation_message',
      ),
      header: this.translateService.instant('releases-table.delete_confirmation'),
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.removeReleases([releaseId]);
      },
      reject: () => {},
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showDeleteSelectionConfirmation(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translateService.instant(
        'releases-table.delete_confirmation_message',
      ),
      header: this.translateService.instant('releases-table.delete_confirmation'),
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.removeReleases(this.selectedReleases.map((value) => value.releaseId));
      },
      reject: () => {},
    });
  }

  showAddDialog() {
    this.resetReleasesForm();
    this.isAddNewDialogVisible = true;
  }

  createNewRelease() {
    const dto: CreateProjectReleaseDto = { version: this.createReleaseForm.get('version')?.value ?? ''};
    this.store.dispatch(
      addProjectRelease({
        projectId: this.project?.projectId ?? '',
        dto: dto,
      }),
    );
    this.store
      .select(selectAddProjectReleaseStatus)
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
            summary: this.translateService.instant('releases-table.error'),
            detail: this.translateService.instant(
              'releases-table.failed_to_create_release',
            ),
          });
        } else if (status && status == StateStatus.SUCCESS) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('releases-table.success'),
            detail: this.translateService.instant('releases-table.release_created'),
          });
          this.isAddNewDialogVisible = !this.isAddNewDialogVisible;
        }
      });
  }

  private removeReleases(ids: string[]) {
    this.store.dispatch(
      removeProjectReleases({
        projectId: this.project?.projectId ?? '',
        ids: ids,
      }),
    );
    this.store
      .select(selectRemoveProjectReleasesStatus)
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
            summary: this.translateService.instant('releases-table.error'),
            detail: this.translateService.instant(
              'releases-table.failed_to_delete_releases',
            ),
          });
        } else if (status && status == StateStatus.SUCCESS) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('releases-table.success'),
            detail: this.translateService.instant('releases-table.removed_releases'),
          });
          this.selectedReleases = [];
        }
      });
  }

  private resetReleasesForm() {
    this.createReleaseForm = this.formBuilder.group({
      version: ['', [Validators.required]],
    });
  }
}
