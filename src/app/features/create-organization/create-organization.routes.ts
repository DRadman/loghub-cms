import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./create-organization.component').then(
        (c) => c.CreateOrganizationComponent,
      ),
  },
];
