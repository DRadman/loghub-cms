import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { AppState } from '../../../core/state/app.state';
import { Store } from '@ngrx/store';
import { Project } from '../../../core/domain/models/project.entity';
import {
  isLoadingSingleProjectAddEnvironments,
  isLoadingSingleProjectEnvironments,
  isLoadingSingleProjectRemoveEnvironments,
  selectAddProjectEnvironmentsStatus,
  selectRemoveProjectEnvironmentsStatus,
  selectSingleProjectEnvironments,
} from '../../../core/state/single-project/single-project.selectors';
import { filter, map, take } from 'rxjs';
import { Permission } from '../../../core/domain/models/enums/permission.enum';
import { selectHasPermission } from '../../../core/state/auth/auth.selectors';
import { ResourceType } from '../../../core/domain/models/enums/resource-type.enum';
import {
  addProjectEnvironments,
  loadProjectEnvironments,
  removeProjectEnvironments,
} from '../../../core/state/single-project/single-project.actions';
import { StateStatus } from '../../../core/domain/models/enums/state-status.enum';

@Component({
  selector: 'app-environments-table',
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
  templateUrl: './environments-table.component.html',
  styleUrl: './environments-table.component.scss',
})
export class EnvironmentsTableComponent implements OnInit {
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

  environmentsForm = this.formBuilder.group({
    environment: ['', [Validators.required]],
  });
  isAddNewDialogVisible: boolean = false;

  selectedEnvironments: { environment: string }[] = [];
  environments = this.store
    .select(selectSingleProjectEnvironments)
    .pipe(
      map(
        (environments) =>
          environments?.map((environment) => ({ environment })) ?? [],
      ),
    );
  isLoadingEnvironments = this.store.select(isLoadingSingleProjectEnvironments);
  isLoadingCreateNew = this.store.select(isLoadingSingleProjectAddEnvironments);
  isLoadingRemoveEnvironments = this.store.select(
    isLoadingSingleProjectRemoveEnvironments,
  );
  hasReadPermission = this.store.select(
    selectHasPermission(ResourceType.PROJECT, Permission.READ),
  );

  ngOnInit(): void {
    this.store.dispatch(
      loadProjectEnvironments({ projectId: this.project?.projectId ?? '' }),
    );
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showDeleteConfirmation(environment: string, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translateService.instant(
        'environments-table.delete_confirmation_message',
      ),
      header: this.translateService.instant(
        'environments-table.delete_confirmation',
      ),
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.removeEnvironments([environment]);
      },
      reject: () => {},
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showDeleteSelectionConfirmation(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translateService.instant(
        'environments-table.delete_confirmation_message',
      ),
      header: this.translateService.instant(
        'environments-table.delete_confirmation',
      ),
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.removeEnvironments(
          this.selectedEnvironments.map((value) => value.environment),
        );
      },
      reject: () => {},
    });
  }

  showAddDialog() {
    this.resetEnvironmentsForm();
    this.isAddNewDialogVisible = true;
  }

  createNewEnvironment() {
    const environments: string[] = [
      this.environmentsForm.get('environment')?.value ?? '',
    ];
    this.store.dispatch(
      addProjectEnvironments({
        projectId: this.project?.projectId ?? '',
        environments: environments,
      }),
    );
    this.store
      .select(selectAddProjectEnvironmentsStatus)
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
            summary: this.translateService.instant('environments-table.error'),
            detail: this.translateService.instant(
              'environments-table.failed_to_create_environment',
            ),
          });
        } else if (status && status == StateStatus.SUCCESS) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant(
              'environments-table.success',
            ),
            detail: this.translateService.instant(
              'environments-table.environment_created',
            ),
          });
          this.isAddNewDialogVisible = !this.isAddNewDialogVisible;
        }
      });
  }

  private removeEnvironments(environments: string[]) {
    this.store.dispatch(
      removeProjectEnvironments({
        projectId: this.project?.projectId ?? '',
        environments: environments,
      }),
    );
    this.store
      .select(selectRemoveProjectEnvironmentsStatus)
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
            summary: this.translateService.instant('environments-table.error'),
            detail: this.translateService.instant(
              'environments-table.failed_to_delete_environments',
            ),
          });
        } else if (status && status == StateStatus.SUCCESS) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant(
              'environments-table.success',
            ),
            detail: this.translateService.instant(
              'environments-table.removed_environments',
            ),
          });
          this.selectedEnvironments = [];
        }
      });
  }

  private resetEnvironmentsForm() {
    this.environmentsForm = this.formBuilder.group({
      environment: ['', [Validators.required]],
    });
  }
}
