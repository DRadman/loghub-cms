import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { Table, TableModule } from 'primeng/table';
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
import { StateStatus } from '../../../core/domain/models/enums/state-status.enum';
import { Platform } from '../../../core/domain/models/platform.entity';
import { Project } from '../../../core/domain/models/project.entity';
import { ProjectService } from '../../../core/services/api/project.api.service';
import { AppState } from '../../../core/state/app.state';
import { loadPlatforms } from '../../../core/state/platform/platform.actions';
import { selectPlatforms } from '../../../core/state/platform/platform.selectors';
import { createProject } from '../../../core/state/project/project.actions';
import {
  isLoadingCreateProject,
  selectCreateProjectStatus,
} from '../../../core/state/project/project.selectors';

@Component({
  selector: 'app-projects-table',
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
  templateUrl: './projects-table.component.html',
  styleUrl: './projects-table.component.scss',
})
export class ProjectsTableComponent implements AfterViewInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private messageService: MessageService,
    private translateService: TranslateService,
    private projectService: ProjectService,
  ) {}

  @ViewChild('dt') dt: Table | undefined;
  @Input()
  data?: Project[] = undefined;

  @ViewChild('name') nameInput!: ElementRef;

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

  createNewProjectForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    platform: [undefined as Platform | undefined, [Validators.required]],
  });
  isAddNewProjectDialogVisible: boolean = false;
  isNameTaken: boolean | null = null;
  isLoadingCreateNewProject = this.store.select(isLoadingCreateProject);
  platforms = this.store.select(selectPlatforms);

  private nameCheckSubscription?: Subscription;

  ngAfterViewInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fromEvent<any>(this.nameInput.nativeElement, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((data) => this.checkName(data));
  }

  ngOnDestroy() {
    this.nameCheckSubscription?.unsubscribe();
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  showAddDialog() {
    this.resetProjectsForm();
    this.store.dispatch(loadPlatforms());
    this.isAddNewProjectDialogVisible = true;
  }

  createNewProject() {
    this.store
      .select(selectCreateProjectStatus)
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
            summary: this.translateService.instant('projects-table.error'),
            detail: this.translateService.instant(
              'projects-table.failed_to_create_project',
            ),
          });
        } else if (status && status == StateStatus.SUCCESS) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('projects-table.success'),
            detail: this.translateService.instant(
              'projects-table.project_created',
            ),
          });
          this.isAddNewProjectDialogVisible =
            !this.isAddNewProjectDialogVisible;
        }
      });

    const dto = {
      name: this.createNewProjectForm.get('name')?.value ?? '',
      platformId:
        this.createNewProjectForm.get('platform')?.value?.platformId ?? '',
    };
    this.store.dispatch(createProject(dto));
  }

  toSlugValue(slug: string): string {
    const result = slug.toLowerCase().replaceAll(' ', '-');
    return result;
  }

  private resetProjectsForm() {
    this.createNewProjectForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      platform: [undefined as Platform | undefined, [Validators.required]],
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
