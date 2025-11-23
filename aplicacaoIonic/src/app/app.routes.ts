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
  {
    path: 'login-professional',
    loadComponent: () => import('./login-professional/login-professional.page').then( m => m.LoginProfessionalPage)
  },
  {
    path: 'login-customer',
    loadComponent: () => import('./login-customer/login-customer.page').then( m => m.LoginCustomerPage)
  },
  {
    path: 'sing-up-customer',
    loadComponent: () => import('./sing-up-customer/sing-up-customer.page').then( m => m.SingUpCustomerPage)
  },
  {
    path: 'sing-up-professional',
    loadComponent: () => import('./sing-up-professional/sing-up-professional.page').then( m => m.SingUpProfessionalPage)
  },
];
