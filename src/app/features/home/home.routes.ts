import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home.component').then((c) => c.HomeComponent),
    children: [
      {
        path: 'projects',
        loadComponent: () =>
          import('../projects/projects.component').then(
            (c) => c.ProjectsComponent,
          ),
        data: {
          breadcrumb: 'Projects',
        },
      },
      {
        path: 'projects/:projectId',
        loadComponent: () =>
          import('../project-details/project-details.component').then(
            (c) => c.ProjectDetailsComponent,
          ),
        data: {
          breadcrumb: 'Project_Details',
        },
      },
      {
        path: 'logs',
        loadComponent: () =>
          import('../logs/logs.component').then(
            (c) => c.LogsComponent,
          ),
        data: {
          breadcrumb: 'Logs',
        },
      },
      {
        path: 'issues',
        loadComponent: () =>
          import('../issues/issues.component').then(
            (c) => c.IssuesComponent,
          ),
        data: {
          breadcrumb: 'Issues',
        },
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('../messages/messages.component').then(
            (c) => c.MessagesComponent,
          ),
        data: {
          breadcrumb: 'Messages',
        },
      },
      {
        path: 'devices',
        loadComponent: () =>
          import('../devices/devices.component').then(
            (c) => c.DevicesComponent,
          ),
        data: {
          breadcrumb: 'Devices',
        },
      },
      {
        path: 'sessions',
        loadComponent: () =>
          import('../sessions/sessions.component').then(
            (c) => c.SessionsComponent,
          ),
        data: {
          breadcrumb: 'Sessions',
        },
      },
      {
        path: 'queries',
        loadComponent: () =>
          import('../peformance/queries/queries.component').then(
            (c) => c.QueriesComponent,
          ),
        data: {
          breadcrumb: 'Queries',
        },
      },
      {
        path: 'vitals',
        loadComponent: () =>
          import('../peformance/vitals/vitals.component').then(
            (c) => c.VitalsComponent,
          ),
        data: {
          breadcrumb: 'Vitals',
        },
      },
      {
        path: 'screen-loads',
        loadComponent: () =>
          import('../peformance/screen-loads/screen-loads.component').then(
            (c) => c.ScreenLoadsComponent,
          ),
        data: {
          breadcrumb: 'Screen_Loads',
        },
      },
      {
        path: 'resources',
        loadComponent: () =>
          import('../peformance/resources/resources.component').then(
            (c) => c.ResourcesComponent,
          ),
        data: {
          breadcrumb: 'Resources',
        },
      },
      {
        path: 'replays',
        loadComponent: () =>
          import('../replays/replays.component').then(
            (c) => c.ReplaysComponent,
          ),
        data: {
          breadcrumb: 'Replays',
        },
      },
      {
        path: 'releases',
        loadComponent: () =>
          import('../releases/releases.component').then(
            (c) => c.ReleasesComponent,
          ),
        data: {
          breadcrumb: 'Releases',
        },
      },
      {
        path: 'stats',
        loadComponent: () =>
          import('../stats/stats.component').then(
            (c) => c.StatsComponent,
          ),
        data: {
          breadcrumb: 'Stats',
        },
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../settings/settings.routes').then((r) => r.routes),
        data: {
          breadcrumb: 'Settings',
        },
      },
      {
        path: 'help',
        loadChildren: () => import('../help/help.routes').then((r) => r.routes),
        data: {
          breadcrumb: 'Help',
        },
      },
      { path: '**', redirectTo: 'projects', pathMatch: 'full' },
    ],
  },
];
