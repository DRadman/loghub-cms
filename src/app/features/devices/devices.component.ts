import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { ProjectRelease } from '../../core/domain/models/project-release.entity';
import { Project } from '../../core/domain/models/project.entity';
import { AppState } from '../../core/state/app.state';
import { loadMyProjects } from '../../core/state/project/project.actions';
import {
  isLoadingMyProjects,
  selectMyProjects,
} from '../../core/state/project/project.selectors';
import { LogSourceDto } from '../../core/domain/dto/log-source.dto';
import { Page } from '../../core/domain/pageable/page.dto';
import { LogSourceService } from '../../core/services/api/log-source.api.service';
import {
  Pageable,
  PageableDefault,
} from '../../core/domain/pageable/pageable.dto';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslateModule } from '@ngx-translate/core';
import { QueryInputComponent } from '../../shared/components/query-input/query-input.component';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    MultiSelectModule,
    TranslateModule,
    QueryInputComponent,
  ],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
})
export class DevicesComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private logSourceService: LogSourceService,
  ) {}

  queryKeys: Record<string, string> = {
    "id": "string",
    "uniqueIdentifier": "string",
    "os": "string",
    "osVersion": "string",
    "environment": "string",
    "ipAddress": "string",
    "macAddress": "string",
    "cpuInfo.model": "string",
    "cpuInfo.speed": "number",
    "cpuInfo.cores": "number",
    "cpuInfo.threads": "number",
    "release.releaseId": "string",
    "release.version": "string",
    "release.releaseTimestamp": "date",
    "maxRam": "number",
    "architecture": "string",
    "createdAt": "date",
    "updatedAt": "date"
  };

  queryKeysDescription: Record<string, string> = {
    "id": "devices.id_description",
    "uniqueIdentifier": "devices.unique_identifier_description",
    "os": "devices.os_description",
    "osVersion": "devices.os_version_description",
    "environment": "devices.environment_description",
    "ipAddress": "devices.ip_address_description",
    "macAddress": "devices.mac_address_description",
    "cpuInfo.model": "devices.cpu_info_model_description",
    "cpuInfo.speed": "devices.cpu_info_speed_description",
    "cpuInfo.cores": "devices.cpu_info_cores_description",
    "cpuInfo.threads": "devices.cpu_info_threads_description",
    "release.releaseId": "devices.release_release_id_description",
    "release.version": "devices.release_version_description",
    "release.releaseTimestamp": "devices.release_timestamp_description",
    "maxRam": "devices.max_ram_description",
    "architecture": "devices.architecture_description",
    "createdAt": "devices.created_at_description",
    "updatedAt": "devices.updated_at_description"
  };

  private projectSubscription?: Subscription;

  projects = this.store
    .select(selectMyProjects)
    .pipe(map((value) => [...(value ?? [])]));
  isLoadingProjects = this.store.select(isLoadingMyProjects);
  isLoadingData = true;
  releases: ProjectRelease[] = [];
  environments: string[] = [];
  private currentPageable: Pageable = new PageableDefault();
  currentPage?: Observable<Page<LogSourceDto>>;
  data?: Observable<LogSourceDto[]>;

  selectedProjects?: Project[];
  selectedReleases?: ProjectRelease[];
  selectedEnvironments?: string[];

  private search: string = '';

  ngOnInit(): void {
    this.store.dispatch(loadMyProjects({}));
    this.projectSubscription = this.projects.subscribe((projects) => {
      if (projects && projects !== null) {
        const environments: Set<string> = new Set();
        const releases: Set<ProjectRelease> = new Set();
        for (const project of projects) {
          project.environments.forEach((environment) =>
            environments.add(environment),
          );
          project.releases.forEach((release) => releases.add(release));
        }
        this.releases = [...releases];
        this.environments = [...environments];

        this.selectedProjects = projects;
        this.selectedEnvironments = undefined;
        this.selectedReleases = undefined;

        this.currentPage = this.logSourceService.findAll(this.currentPageable, {
          projectIds: projects.map((project) => project.projectId),
        });

        this.data = this.currentPage.pipe(
          map((page) => {
            this.isLoadingData = false;
            return page.content;
          }),
        );
      }
    });
  }

  onQueryChanged($event: string) {
    this.search = $event;
    this.fetchData();
  }

  fetchData() {
    this.isLoadingData = true;
    let search: string | undefined = undefined;
    if (this.search !== '') {
      search = this.search;
    }
    this.currentPage = this.logSourceService.findAll(this.currentPageable, {
      projectIds:
        this.selectedProjects?.map((project) => project.projectId) ?? [],
      environments: this.selectedEnvironments,
      releaseIds: this.selectedReleases?.map((release) => release.releaseId),
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

  ngOnDestroy(): void {
    this.projectSubscription?.unsubscribe();
  }

  selectProjects() {
    this.currentPageable.page = 0;
    const environments: Set<string> = new Set();
    const releases: Set<ProjectRelease> = new Set();
    this.selectedProjects?.forEach((project: Project) => {
      project.environments.forEach((environment) =>
        environments.add(environment),
      );
      project.releases.forEach((release) => releases.add(release));
    });
    this.releases = [...releases];
    this.environments = [...environments];

    this.selectedEnvironments = undefined;
    this.selectedReleases = undefined;

    this.fetchData();
  }

  selectEnvironment() {
    this.currentPageable.page = 0;
    this.fetchData();
  }

  selectRelease() {
    this.currentPageable.page = 0;
    this.fetchData();
  }
}
