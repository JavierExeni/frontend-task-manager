import { Routes } from '@angular/router';
import { notAuthGuard } from './core/guards/not-auth.guard';
import { isAuthGuard } from './core/guards/is-auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./modules/tasks/pages/task-page/task-page.component'),
    canMatch: [isAuthGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login.component'),
    canMatch: [notAuthGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'prefix',
  },
];
