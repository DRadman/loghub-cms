import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.routes').then(r => r.routes),
  },
  {
    path: 'auth',
    loadChildren: () =>
        import('./features/auth/auth.routes').then(r => r.routes)
  },
  {
    path: 'create-organization',
    loadChildren: () =>
        import('./features/create-organization/create-organization.routes').then(r => r.routes)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
