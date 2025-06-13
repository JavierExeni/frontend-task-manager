import { Routes } from '@angular/router';
import { notAuthGuard } from './core/guards/not-auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./modules/tasks/pages/task-page/task-page.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login.component'),
    canMatch: [notAuthGuard],
  },
];
