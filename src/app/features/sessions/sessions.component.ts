import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { QueryInputComponent } from '../../shared/components/query-input/query-input.component';
import {
  Pageable,
  PageableDefault,
} from '../../core/domain/pageable/pageable.dto';
import { AppState } from '../../core/state/app.state';
import { Store } from '@ngrx/store';
import {
  isLoadingMyProjects,
  selectMyProjects,
} from '../../core/state/project/project.selectors';
import { Observable, Subscription, map } from 'rxjs';
import { Page } from '../../core/domain/pageable/page.dto';
import { LogSessionDto } from '../../core/domain/dto/log-session.dto';
import { LogSessionService } from '../../core/services/api/log-session.api.service';
import { Project } from '../../core/domain/models/project.entity';
import { loadMyProjects } from '../../core/state/project/project.actions';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    TranslateModule,
    MultiSelectModule,
    QueryInputComponent,
  ],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss',
})
export class SessionsComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private logSessionService: LogSessionService,
  ) {}

  projects = this.store
    .select(selectMyProjects)
    .pipe(map((value) => [...(value ?? [])]));
  isLoadingProjects = this.store.select(isLoadingMyProjects);
  isLoadingData = true;

  private currentPageable: Pageable = new PageableDefault();
  currentPage?: Observable<Page<LogSessionDto>>;
  data?: Observable<LogSessionDto[]>;

  selectedProjects?: Project[];

  private projectSubscription?: Subscription;
  private search: string = '';

  queryKeys: Record<string, string> = {
    sessionId: 'string',
    startTime: 'date',
    endTime: 'date',
    crashFree: 'boolean',
    networkType: 'string',
    networkSpeed: 'string',
  };

  queryKeysDescription: Record<string, string> = {
    sessionId: 'sessions.session_id_description',
    startTime: 'sessions.start_time_description',
    endTime: 'sessions.end_time_description',
    crashFree: 'sessions.crash_free_description',
    networkType: 'sessions.network_type_description',
    networkSpeed: 'sessions.network_speed_description',
  };

  ngOnInit(): void {
    this.store.dispatch(loadMyProjects({}));
    this.projectSubscription = this.projects.subscribe((projects) => {
      if (projects && projects !== null) {
        this.selectedProjects = projects;

        this.currentPage = this.logSessionService.findAll(
          this.currentPageable,
          {
            projectIds: projects.map((project) => project.projectId),
          },
        );

        this.data = this.currentPage.pipe(
          map((page) => {
            this.isLoadingData = false;
            return page.content;
          }),
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.projectSubscription?.unsubscribe();
  }

  onQueryChanged($event: string) {
    this.search = $event;
    this.fetchData();
  }

  selectProjects() {
    this.currentPageable.page = 0;
    this.fetchData();
  }

  fetchData() {
    this.isLoadingData = true;
    let search: string | undefined = undefined;
    if (this.search !== '') {
      search = this.search;
    }
    console.log('Search is: ' + search)
    this.currentPage = this.logSessionService.findAll(this.currentPageable, {
      projectIds:
        this.selectedProjects?.map((project) => project.projectId) ?? [],
      search: search,
    });

    this.data = this.currentPage.pipe(
      map((page) => {
        this.isLoadingData = false;
        return page.content;
      }),
    );
  }

  loadPage($event: TableLazyLoadEvent) {
    this.currentPageable.size = $event.rows ?? this.currentPageable.size;
    this.currentPageable.page = $event.first ?? 0 / this.currentPageable.size;
    if ($event.sortField) {
      let sortField: string;
      if (Array.isArray($event.sortField)) {
        sortField = $event.sortField[0];
      } else {
        sortField = $event.sortField;
      }
      let sortOrder: 'ASC' | 'DESC' = 'ASC';
      if ($event.sortOrder && $event.sortOrder === 1) {
        sortOrder = 'ASC';
      } else {
        sortOrder = 'DESC';
      }
      this.currentPageable.sort = [sortField + ',' + sortOrder];
    }
    this.fetchData();
  }
}
