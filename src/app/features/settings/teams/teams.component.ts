import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Permission } from '../../../core/domain/models/enums/permission.enum';
import { ResourceType } from '../../../core/domain/models/enums/resource-type.enum';
import { AppState } from '../../../core/state/app.state';
import { selectHasPermission } from '../../../core/state/auth/auth.selectors';
import { AccessDeniedComponent } from '../../../shared/components/access-denied/access-denied.component';
import { PanelModule } from 'primeng/panel';
import { TeamsTableComponent } from '../../../shared/components/teams-table/teams-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { isLoadingMyTeams, isLoadingOrganizationTeams, selectMyTeams, selectOrganizationTeams } from '../../../core/state/team/team.selectors';
import { loadMyTeams, loadOrganizationTeams } from '../../../core/state/team/team.actions';

@Component({
  selector: 'app-teams',
  standalone: true,
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
  imports: [
    CommonModule,
    AccessDeniedComponent,
    PanelModule,
    TeamsTableComponent,
    TranslateModule
  ],
})
export class TeamsComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  hasReadPermission = this.store.select(
    selectHasPermission(ResourceType.TEAM, Permission.READ),
  );
  hasDeletePermission = this.store.select(
    selectHasPermission(ResourceType.TEAM, Permission.DELETE),
  );
  hasCreatePermission = this.store.select(
    selectHasPermission(ResourceType.TEAM, Permission.CREATE),
  );

  isLoadingOrganizationTeams = this.store.select(isLoadingOrganizationTeams);
  isLoadingMyTeams = this.store.select(isLoadingMyTeams);
  organizationTeams = this.store.select(selectOrganizationTeams);
  myTeams = this.store.select(selectMyTeams);

  ngOnInit(): void {
    this.store.dispatch(loadOrganizationTeams());
    this.store.dispatch(loadMyTeams());
  }
}
