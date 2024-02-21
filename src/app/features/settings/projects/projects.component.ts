import { Component } from '@angular/core';
import { selectHasPermission } from '../../../core/state/auth/auth.selectors';
import { ResourceType } from '../../../core/domain/models/enums/resource-type.enum';
import { Permission } from '../../../core/domain/models/enums/permission.enum';
import {
  isLoadingAllProjects,
  selectAllProjects,
} from '../../../core/state/project/project.selectors';
import { loadAllProjects } from '../../../core/state/project/project.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/state/app.state';
import { CommonModule } from '@angular/common';
import { AccessDeniedComponent } from '../../../shared/components/access-denied/access-denied.component';
import { PanelModule } from 'primeng/panel';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectsTableComponent } from '../../../shared/components/projects-table/projects-table.component';
import { map } from 'rxjs';

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
export class ProjectsComponent {
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
