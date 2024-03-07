import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./settings.component').then((c) => c.SettingsComponent),
    data: {
      breadcrumb: 'Settings',
    },
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.routes').then((r) => r.routes),
    data: {
      breadcrumb: 'Settings_Account',
    },
  },
  {
    path: 'organization',
    loadComponent: () =>
      import('./organization/organization.component').then(
        (c) => c.OrganizationComponent,
      ),
    data: {
      breadcrumb: 'Settings_Organization',
    },
  },
  {
    path: 'members',
    loadComponent: () =>
      import('./members/members.component').then((c) => c.MembersComponent),
    data: {
      breadcrumb: 'Settings_Members',
    },
  },
  {
    path: 'alerts',
    loadComponent: () =>
      import('./alerts/alerts.component').then((c) => c.AlertsComponent),
    data: {
      breadcrumb: 'Settings_Alerts',
    },
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./projects/projects.component').then((c) => c.ProjectsComponent),
    data: {
      breadcrumb: 'Settings_Projects',
    },
  },
  {
    path: 'teams',
    loadComponent: () =>
      import('./teams/teams.component').then((c) => c.TeamsComponent),
    data: {
      breadcrumb: 'Settings_Teams',
    },
  },
  {
    path: 'teams/:teamId',
    loadComponent: () =>
      import('./teams/components/single-team/single-team.component').then(
        (c) => c.SingleTeamComponent,
      ),
  },
  {
    path: 'projects/:projectId',
    loadComponent: () =>
      import('./projects/components/single-project/single-project.component').then(
        (c) => c.SingleProjectComponent,
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
