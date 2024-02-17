import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'details',
    loadComponent: () =>
      import('./details/details.component').then((c) => c.DetailsComponent),
    data: {
      breadcrumb: 'Settings_Account_Details',
    },
  },
  {
    path: 'security',
    loadComponent: () =>
      import('./security/security.component').then((c) => c.SecurityComponent),
    data: {
      breadcrumb: 'Settings_Account_Security',
    },
  },
  {
    path: 'notifications',
    loadComponent: () =>
      import('./notifications/notifications.component').then((c) => c.NotificationsComponent),
    data: {
      breadcrumb: 'Settings_Account_Notifications',
    },
  },
  {
    path: 'close',
    loadComponent: () =>
      import('./close/close.component').then((c) => c.CloseComponent),
    data: {
      breadcrumb: 'Settings_Account_Close',
    },
  },
  { path: '**', redirectTo: 'details', pathMatch: 'full' }
];
