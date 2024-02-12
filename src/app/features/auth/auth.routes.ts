import { Routes } from '@angular/router';
import { registrationGuard } from '../../core/guards/registration.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth.component').then((c) => c.AuthComponent),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        canActivate: [registrationGuard],
      },
      {
        path: 'invitation/:id',
        loadComponent: () =>
          import('./components/invitation/invitation.component').then(
            (c) => c.InvitationComponent
          ),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./components/forgot-password/forgot-password.component').then(
            (c) => c.ForgotPasswordComponent
          ),
      }, //Forgot Password Component
      {
        path: 'reset-password/:secret',
        loadComponent: () =>
          import('./components/reset-password/reset-password.component').then(
            (c) => c.ResetPasswordComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },

];
