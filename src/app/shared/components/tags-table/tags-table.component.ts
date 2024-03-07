import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/state/app.state';
import { Project } from '../../../core/domain/models/project.entity';
import {
  addProjectTags,
  loadProjectTags,
  removeProjectTags,
} from '../../../core/state/single-project/single-project.actions';
import {
  isLoadingSingleProjectAddTags,
  isLoadingSingleProjectRemoveTags,
  isLoadingSingleProjectTags,
  selectAddProjectTagsStatus,
  selectRemoveProjectTagsStatus,
  selectSingleProjectTags,
} from '../../../core/state/single-project/single-project.selectors';
import { filter, map, take } from 'rxjs';
import { selectHasPermission } from '../../../core/state/auth/auth.selectors';
import { ResourceType } from '../../../core/domain/models/enums/resource-type.enum';
import { Permission } from '../../../core/domain/models/enums/permission.enum';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AccessDeniedComponent } from '../access-denied/access-denied.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StateStatus } from '../../../core/domain/models/enums/state-status.enum';

@Component({
  selector: 'app-tags-table',
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
  templateUrl: './tags-table.component.html',
  styleUrl: './tags-table.component.scss',
})
export class TagsTableComponent implements OnInit {
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

  tagsForm = this.formBuilder.group({
    tag: ['', [Validators.required]],
  });
  isAddNewDialogVisible: boolean = false;

  selectedTags: { tag: string }[] = [];
  tags = this.store
    .select(selectSingleProjectTags)
    .pipe(map((tags) => tags?.map((tag) => ({ tag })) ?? []));
  isLoadingTags = this.store.select(isLoadingSingleProjectTags);
  isLoadingCreateNew = this.store.select(isLoadingSingleProjectAddTags);
  isLoadingRemoveTags = this.store.select(isLoadingSingleProjectRemoveTags);
  hasReadPermission = this.store.select(
    selectHasPermission(ResourceType.PROJECT, Permission.READ),
  );

  ngOnInit(): void {
    this.store.dispatch(
      loadProjectTags({ projectId: this.project?.projectId ?? '' }),
    );
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showDeleteConfirmation(tag: string, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translateService.instant(
        'tags-table.delete_confirmation_message',
      ),
      header: this.translateService.instant('tags-table.delete_confirmation'),
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.removeTags([tag]);
      },
      reject: () => {},
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showDeleteSelectionConfirmation(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translateService.instant(
        'tags-table.delete_confirmation_message',
      ),
      header: this.translateService.instant('tags-table.delete_confirmation'),
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.removeTags(this.selectedTags.map((value) => value.tag));
      },
      reject: () => {},
    });
  }

  showAddDialog() {
    this.resetTagsForm();
    this.isAddNewDialogVisible = true;
  }

  createNewTag() {
    const tags: string[] = [this.tagsForm.get('tag')?.value ?? ''];
    this.store.dispatch(
      addProjectTags({
        projectId: this.project?.projectId ?? '',
        tags: tags,
      }),
    );
    this.store
      .select(selectAddProjectTagsStatus)
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
            summary: this.translateService.instant('tags-table.error'),
            detail: this.translateService.instant(
              'tags-table.failed_to_create_tag',
            ),
          });
        } else if (status && status == StateStatus.SUCCESS) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('tags-table.success'),
            detail: this.translateService.instant('tags-table.tag_created'),
          });
          this.isAddNewDialogVisible = !this.isAddNewDialogVisible;
        }
      });
  }

  private removeTags(tags: string[]) {
    this.store.dispatch(
      removeProjectTags({
        projectId: this.project?.projectId ?? '',
        tags: tags,
      }),
    );
    this.store
      .select(selectRemoveProjectTagsStatus)
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
            summary: this.translateService.instant('tags-table.error'),
            detail: this.translateService.instant(
              'tags-table.failed_to_delete_tags',
            ),
          });
        } else if (status && status == StateStatus.SUCCESS) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('tags-table.success'),
            detail: this.translateService.instant('tags-table.removed_tags'),
          });
          this.selectedTags = [];
        }
      });
  }

  private resetTagsForm() {
    this.tagsForm = this.formBuilder.group({
      tag: ['', [Validators.required]],
    });
  }
}
