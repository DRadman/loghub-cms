import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  take,
} from 'rxjs';
import { Permission } from '../../../../../core/domain/models/enums/permission.enum';
import { ResourceType } from '../../../../../core/domain/models/enums/resource-type.enum';
import { StateStatus } from '../../../../../core/domain/models/enums/state-status.enum';
import { Project } from '../../../../../core/domain/models/project.entity';
import { User } from '../../../../../core/domain/models/user.entity';
import { TeamService } from '../../../../../core/services/api/team.api.service';
import { AppState } from '../../../../../core/state/app.state';
import { selectHasPermission } from '../../../../../core/state/auth/auth.selectors';
import {
  addTeamMembers,
  addTeamProjects,
  loadTeamById,
  loadTeamMembers,
  loadTeamProjects,
  removeTeamMembers,
  removeTeamProjects,
  resetSingleTeamState,
  updateTeam,
} from '../../../../../core/state/single-team/single-team.actions';
import {
  isLoadingTeamMembers,
  isLoadingTeamProjects,
  isLoadingUpdateTeam,
  selectSingleTeam,
  selectSingleTeamMembers,
  selectSingleTeamProjects,
  selectUpdateTeamStatus,
} from '../../../../../core/state/single-team/single-team.selectors';
import { AccessDeniedComponent } from '../../../../../shared/components/access-denied/access-denied.component';
import { MemberPickerComponent } from '../../../../../shared/components/member-picker/member-picker.component';
import { MembersTableComponent } from '../../../../../shared/components/members-table/members-table.component';
import { NotFoundComponent } from '../../../../../shared/components/not-found/not-found.component';
import { ProjectPickerComponent } from '../../../../../shared/components/project-picker/project-picker.component';
import { ProjectsTableComponent } from '../../../../../shared/components/projects-table/projects-table.component';

@Component({
  selector: 'app-single-team',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    PanelModule,
    AccessDeniedComponent,
    ToastModule,
    TranslateModule,
    MembersTableComponent,
    ProjectsTableComponent,
    ButtonModule,
    RippleModule,
    ConfirmDialogModule,
    NotFoundComponent,
    InputTextModule,
    DividerModule,
    BadgeModule,
    MemberPickerComponent,
    ProjectPickerComponent,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './single-team.component.html',
  styleUrl: './single-team.component.scss',
})
export class SingleTeamComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  @Input()
  private teamId?: string;

  @ViewChild('slug') slugInput!: ElementRef;
  constructor(
    private store: Store<AppState>,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private teamService: TeamService,
    private router: Router,
    private translateService: TranslateService,
  ) {}

  hasReadPermission = this.store.select(
    selectHasPermission(ResourceType.TEAM, Permission.READ),
  );
  hasDeletePermission = this.store.select(
    selectHasPermission(ResourceType.TEAM, Permission.DELETE),
  );
  hasUpdatePermission = this.store.select(
    selectHasPermission(ResourceType.TEAM, Permission.DELETE),
  );
  isLoadingMembers = this.store.select(isLoadingTeamMembers);
  isLoadingProjects = this.store.select(isLoadingTeamProjects);
  isLoadingUpdateTeam = this.store.select(isLoadingUpdateTeam);
  isSlugTaken: boolean | null = null;
  team = this.store.select(selectSingleTeam);
  members = this.store
    .select(selectSingleTeamMembers)
    .pipe(map((value) => [...(value ?? [])]));
  projects = this.store
    .select(selectSingleTeamProjects)
    .pipe(map((value) => [...(value ?? [])]));
  registerOnce: boolean = false;

  private slugCheckSubscription?: Subscription;

  ngOnInit(): void {
    this.store.dispatch(loadTeamById({ teamId: this.teamId ?? '' }));
    this.store.dispatch(loadTeamMembers({ teamId: this.teamId ?? '' }));
    this.store.dispatch(loadTeamProjects({ teamId: this.teamId ?? '' }));
  }

  ngAfterViewChecked() {
    if (!this.registerOnce && this.slugInput) {
      this.registerOnce = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fromEvent<any>(this.slugInput.nativeElement, 'input')
        .pipe(
          map((event: Event) => (event.target as HTMLInputElement).value),
          debounceTime(500),
          distinctUntilChanged(),
        )
        .subscribe((data) => this.checkSlug(data));
    }
  }

  ngOnDestroy(): void {
    this.slugCheckSubscription?.unsubscribe();
    this.store.dispatch(resetSingleTeamState());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  showDeleteTeamConfirmation(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translateService.instant(
        'single-team.delete_confirmation_message',
      ),
      header: this.translateService.instant('single-team.delete_confirmation'),
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.deleteTeam();
      },
      reject: () => {},
    });
  }

  toSlugValue(slug: string): string {
    const result = slug.toLowerCase().replaceAll(' ', '-');
    return result;
  }

  private deleteTeam() {
    this.teamService.deleteTeam(this.teamId ?? '').subscribe({
      next: () => {
        this.router.navigate(['/home/settings/teams']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: this.translateService.instant('single-team.error'),
          detail: this.translateService.instant(
            'single-team.failed_to_delete_team',
          ),
        });
      },
    });
  }

  private checkSlug(slug: string) {
    this.slugCheckSubscription?.unsubscribe();
    this.slugCheckSubscription = this.teamService.isSlugTaken(slug).subscribe({
      next: (result) => {
        this.isSlugTaken = result;
      },
      error: () => {
        this.isSlugTaken = null;
      },
    });
  }

  updateTeamSlug(slug: string) {
    this.store.dispatch(
      updateTeam({ teamId: this.teamId ?? '', dto: { slug: slug } }),
    );
    this.store
      .select(selectUpdateTeamStatus)
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
            summary: this.translateService.instant('single-team.error'),
            detail: this.translateService.instant(
              'single-team.failed_to_update_team',
            ),
          });
        }
      });
  }

  onAddMembers = (members: User[]) => {
    this.store.dispatch(
      addTeamMembers({
        teamId: this.teamId ?? '',
        ids: members.map((member) => member.userId),
      }),
    );
  };

  onRemoveMembers = (members: User[]) => {
    this.store.dispatch(
      removeTeamMembers({
        teamId: this.teamId ?? '',
        ids: members.map((member) => member.userId),
      }),
    );
  };

  onAddProjects = (projects: Project[]) => {
    this.store.dispatch(
      addTeamProjects({
        teamId: this.teamId ?? '',
        ids: projects.map((project) => project.projectId),
      }),
    );
  };

  onRemoveProjects = (projects: Project[]) => {
    this.store.dispatch(
      removeTeamProjects({
        teamId: this.teamId ?? '',
        ids: projects.map((project) => project.projectId),
      }),
    );
  };
}
