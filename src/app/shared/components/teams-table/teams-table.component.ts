import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Team } from '../../../core/domain/models/team.entity';
import { AppState } from '../../../core/state/app.state';
import { Store } from '@ngrx/store';
import {
  isLoadingCreateNewTeam,
  selectCreateNewTeamStatus,
} from '../../../core/state/team/team.selectors';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  take,
} from 'rxjs';
import { StateStatus } from '../../../core/domain/models/enums/state-status.enum';
import { createTeam } from '../../../core/state/team/team.actions';
import { TeamService } from '../../../core/services/api/team.api.service';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-teams-table',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    TableModule,
    TranslateModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    AvatarModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './teams-table.component.html',
  styleUrl: './teams-table.component.scss',
})
export class TeamsTableComponent implements AfterViewInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private messageService: MessageService,
    private translateService: TranslateService,
    private teamService: TeamService,
  ) {}

  @ViewChild('dt') dt: Table | undefined;
  @Input()
  data?: Team[] = undefined;

  @ViewChild('slug') slugInput!: ElementRef;

  @Input()
  isLoading: boolean = true;

  @Input()
  enableFiltering: boolean = true;

  @Input()
  enableSorting: boolean = true;

  @Input()
  enableGlobalSearch: boolean = true;

  @Input()
  enablePagination: boolean = true;

  @Input()
  enableAddAction: boolean = false;

  @Input()
  enableDeleteAction: boolean = false;

  createNewTeamForm = this.formBuilder.group({
    slug: ['', [Validators.required]],
  });
  isAddNewTeamDialogVisible: boolean = false;
  isSlugTaken: boolean | null = null;
  isLoadingCreateNewTeam = this.store.select(isLoadingCreateNewTeam);

  private slugCheckSubscription?: Subscription;

  ngAfterViewInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fromEvent<any>(this.slugInput.nativeElement, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((data) => this.checkSlug(data));
  }

  ngOnDestroy() {
    this.slugCheckSubscription?.unsubscribe();
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  showAddDialog() {
    this.resetTeamsForm();
    this.isAddNewTeamDialogVisible = true;
  }

  createNewTeam() {
    this.store
      .select(selectCreateNewTeamStatus)
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
            summary: this.translateService.instant('teams-table.error'),
            detail: this.translateService.instant(
              'teams-table.failed_to_create_team',
            ),
          });
        } else if (status && status == StateStatus.SUCCESS) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('teams-table.success'),
            detail: this.translateService.instant('teams-table.team_created'),
          });
          this.isAddNewTeamDialogVisible = !this.isAddNewTeamDialogVisible;
        }
      });

    const dto = {
      slug: this.createNewTeamForm.get('slug')?.value ?? '',
    };
    this.store.dispatch(createTeam(dto));
  }

  toSlugValue(slug: string): string {
    const result = slug.toLowerCase().replaceAll(' ', '-');
    return result;
  }

  private resetTeamsForm() {
    this.createNewTeamForm = this.formBuilder.group({
      slug: ['', [Validators.required]],
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
}
