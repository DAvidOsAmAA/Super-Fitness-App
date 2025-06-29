import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/auth-page.component').then((c) => c.AuthPageComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/components/login/login.component').then((c) => c.LoginComponent),
      },
      {
        path: 'regester',
        loadComponent: () =>
          import('./pages/components/Regester/Regester.component').then((c) => c.RegesterComponent),
      },

      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./pages/components/ForgetPass/forget-pass/forget-pass.component').then((c) => c.ForgetPassComponent),
      },
      {
        path: 'otp-code',
        loadComponent: () =>
          import('./pages/components/ForgetPass/otp-code/otp-code.component').then((c) => c.OtpCodeComponent),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./pages/components/ForgetPass/reset-pass/reset-pass.component').then((c) => c.ResetPassComponent),
      },


    ],
  },
];
