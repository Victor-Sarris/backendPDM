import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'role-selection',
    loadComponent: () => import('./role-selection/role-selection.page').then( m => m.RoleSelectionPage)
  },
];
