import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { AccessDeniedComponent } from '../../../../../shared/components/access-denied/access-denied.component';
import { NotFoundComponent } from '../../../../../shared/components/not-found/not-found.component';
import { selectHasPermission } from '../../../../../core/state/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../core/state/app.state';
import { ProjectService } from '../../../../../core/services/api/project.api.service';
import { Router } from '@angular/router';
import { ResourceType } from '../../../../../core/domain/models/enums/resource-type.enum';
import { Permission } from '../../../../../core/domain/models/enums/permission.enum';
import {
  isLoadingSingleProjectTeams,
  isLoadingUpdateProject,
  selectSingleProject,
  selectSingleProjectTeams,
  selectUpdateProjectStatus,
} from '../../../../../core/state/single-project/single-project.selectors';
import {
  addProjectTeams,
  loadProjectById,
  loadProjectDebugFiles,
  loadProjectTeams,
  removeProjectTeams,
  resetSingleProjectState,
  updateProject,
} from '../../../../../core/state/single-project/single-project.actions';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  take,
} from 'rxjs';
import { Project } from '../../../../../core/domain/models/project.entity';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { DropdownModule } from 'primeng/dropdown';
import { selectPlatforms } from '../../../../../core/state/platform/platform.selectors';
import { loadPlatforms } from '../../../../../core/state/platform/platform.actions';
import { CreateProjectRequestDto } from '../../../../../core/domain/dto/requests/create-project-request.dto';
import { StateStatus } from '../../../../../core/domain/models/enums/state-status.enum';
import { TeamsTableComponent } from '../../../../../shared/components/teams-table/teams-table.component';
import { TeamPickerComponent } from '../../../../../shared/components/team-picker/team-picker.component';
import { Team } from '../../../../../core/domain/models/team.entity';
import { TagsTableComponent } from '../../../../../shared/components/tags-table/tags-table.component';
import { EnvironmentsTableComponent } from '../../../../../shared/components/environments-table/environments-table.component';
import { ReleasesTableComponent } from '../../../../../shared/components/releases-table/releases-table.component';
import { DebugFilesTableComponent } from '../../../../../shared/components/debug-files-table/debug-files-table.component';

@Component({
  selector: 'app-single-project',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    NotFoundComponent,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    TranslateModule,
    TabViewModule,
    PanelModule,
    DialogModule,
    DividerModule,
    BadgeModule,
    DropdownModule,
    AccessDeniedComponent,
    TeamsTableComponent,
    TeamPickerComponent,
    TagsTableComponent,
    EnvironmentsTableComponent,
    ReleasesTableComponent,
    DebugFilesTableComponent,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './single-project.component.html',
  styleUrl: './single-project.component.scss',
})
export class SingleProjectComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  @Input()
  private projectId?: string;

  @ViewChild('name') nameInput!: ElementRef;

  constructor(
    private store: Store<AppState>,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private router: Router,
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
  ) {}

  hasReadPermission = this.store.select(
    selectHasPermission(ResourceType.PROJECT, Permission.READ),
  );
  hasDeletePermission = this.store.select(
    selectHasPermission(ResourceType.PROJECT, Permission.DELETE),
  );
  hasUpdatePermission = this.store.select(
    selectHasPermission(ResourceType.PROJECT, Permission.DELETE),
  );
  isLoadingUpdateClientSecurity: boolean = false;
  isLoadingUpdateProjectDetails = this.store.select(isLoadingUpdateProject);
  isLoadingProjectTeams = this.store.select(isLoadingSingleProjectTeams);
  isNameTaken: boolean | null = null;
  registerOnce: boolean = false;

  project = this.store.select(selectSingleProject);
  platforms = this.store.select(selectPlatforms);
  teams = this.store
    .select(selectSingleProjectTeams)
    .pipe(map((value) => [...(value ?? [])]));

  clientSecurityForm: FormGroup = this.formBuilder.group({
    allowedDomains: [{ value: '', disabled: true }],
    securityToken: [{ value: '', disabled: true }],
    securityHeader: [{ value: '', disabled: true }],
  });
  projectDetailsForm: FormGroup = this.formBuilder.group({
    projectId: [{ value: '', disabled: true }],
    name: [{ value: '', disabled: true }],
    platform: [{ value: undefined, disabled: true }],
  });

  private projectSubscription?: Subscription;
  private nameCheckSubscription?: Subscription;

  ngOnInit(): void {
    this.store.dispatch(loadProjectById({ projectId: this.projectId ?? '' }));
    this.store.dispatch(loadProjectTeams({ projectId: this.projectId ?? '' }));
    this.store.dispatch(loadProjectDebugFiles({ projectId: this.projectId ?? '' }));
    this.store.dispatch(loadPlatforms());
    this.projectSubscription = this.store
      .select(selectSingleProject)
      .subscribe((project) => {
        this.resetForms(project);
      });
  }

  ngAfterViewChecked() {
    if (!this.registerOnce && this.nameInput) {
      this.registerOnce = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fromEvent<any>(this.nameInput.nativeElement, 'input')
        .pipe(
          map((event: Event) => (event.target as HTMLInputElement).value),
          debounceTime(500),
          distinctUntilChanged(),
        )
        .subscribe((data) => this.checkName(data));
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetSingleProjectState());
    this.projectSubscription?.unsubscribe();
    this.nameCheckSubscription?.unsubscribe();
  }

  toSlugValue(slug: string): string {
    const result = slug.toLowerCase().replaceAll(' ', '-');
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  showDeleteProjectConfirmation(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translateService.instant(
        'single-project.delete_confirmation_message',
      ),
      header: this.translateService.instant(
        'single-project.delete_confirmation',
      ),
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.deleteProject();
      },
      reject: () => {},
    });
  }

  updateProjectClientSecurity() {
    throw new Error('Method not implemented.');
  }

  updateProjectDetails() {
    const dto: CreateProjectRequestDto = {
      name: this.projectDetailsForm.get('name')?.value,
      platformId: this.projectDetailsForm.get('platform')?.value?.platformId,
    };
    this.store.dispatch(
      updateProject({ projectId: this.projectId ?? '', dto: dto }),
    );
    this.store
      .select(selectUpdateProjectStatus)
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
            summary: this.translateService.instant('single-project.error'),
            detail: this.translateService.instant(
              'single-project.failed_to_update_project_details',
            ),
          });
        } else if (status && status == StateStatus.SUCCESS) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('single-project.success'),
            detail: this.translateService.instant(
              'single-project.project_details_updated_successfully',
            ),
          });
        }
      });
  }

  onAddTeams = (teams: Team[]) => {
    this.store.dispatch(
      addProjectTeams({
        projectId: this.projectId ?? '',
        ids: teams.map((team) => team.teamId),
      }),
    );
  };

  onRemoveTeams = (teams: Team[]) => {
    this.store.dispatch(
      removeProjectTeams({
        projectId: this.projectId ?? '',
        ids: teams.map((team) => team.teamId),
      }),
    );
  };

  private resetForms(project: Project | null) {
    if (project !== null) {
      this.projectDetailsForm = this.formBuilder.group({
        name: [project.name, Validators.required],
        projectId: [
          { value: project.projectId, disabled: true },
          Validators.required,
        ],
        platform: [project.platform, Validators.required],
      });

      this.projectService.getProjectSecurityClientConfig(project.projectId).subscribe((key) => {
        this.clientSecurityForm = this.formBuilder.group({
          securityToken: [
            { value: key.securityToken, disabled: true },
            Validators.required,
          ],
          securityHeader: [
            { value: key.securityHeader, disabled: true },
            Validators.required,
          ],
          allowedDomains: [
            { value: key.allowedDomains, disabled: true },
            Validators.required,
          ],
        });
      });
    }
  }

  private deleteProject() {
    this.projectService.deleteProject(this.projectId ?? '').subscribe({
      next: () => {
        this.router.navigate(['/home/settings/projects']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: this.translateService.instant('single-project.error'),
          detail: this.translateService.instant(
            'single-team.failed_to_delete_project',
          ),
        });
      },
    });
  }

  private checkName(name: string) {
    this.nameCheckSubscription?.unsubscribe();
    this.nameCheckSubscription = this.projectService
      .isNameTaken(name)
      .subscribe({
        next: (result) => {
          this.isNameTaken = result;
        },
        error: () => {
          this.isNameTaken = null;
        },
      });
  }
}
