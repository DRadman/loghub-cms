import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { PanelModule } from 'primeng/panel';
import { map } from 'rxjs';
import { Permission } from '../../../core/domain/models/enums/permission.enum';
import { ResourceType } from '../../../core/domain/models/enums/resource-type.enum';
import { AppState } from '../../../core/state/app.state';
import { selectHasPermission } from '../../../core/state/auth/auth.selectors';
import { loadAllProjects } from '../../../core/state/project/project.actions';
import {
  isLoadingAllProjects,
  selectAllProjects,
} from '../../../core/state/project/project.selectors';
import { AccessDeniedComponent } from '../../../shared/components/access-denied/access-denied.component';
import { ProjectsTableComponent } from '../../../shared/components/projects-table/projects-table.component';

@Component({
  selector: 'app-projects-settings',
  standalone: true,
  imports: [
    CommonModule,
    AccessDeniedComponent,
    PanelModule,
    TranslateModule,
    ProjectsTableComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  hasReadPermission = this.store.select(
    selectHasPermission(ResourceType.PROJECT, Permission.READ),
  );
  hasCreatePermission = this.store.select(
    selectHasPermission(ResourceType.PROJECT, Permission.CREATE),
  );

  isLoadingAllProjects = this.store.select(isLoadingAllProjects);
  projects = this.store
    .select(selectAllProjects)
    .pipe(map((value) => [...(value ?? [])]));

  ngOnInit(): void {
    this.store.dispatch(loadAllProjects());
  }
}
