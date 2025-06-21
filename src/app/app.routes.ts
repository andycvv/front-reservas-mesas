import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { authGuard } from './auth/auth.guard';
import { NotFoundComponent } from './auth/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'auth/registrar', component: RegistrarComponent, canActivate: [authGuard] },

  {
    path: 'mesas',
    loadChildren: () => import('./mesas/mesas.routes').then(m => m.routes)
  },
  {
    path: 'ubicaciones',
    loadChildren: () => import('./ubicaciones/ubicaciones.routes').then(m => m.routes)
  },
  {
    path: 'horarios',
    loadChildren: () => import('./horarios/horarios.routes').then(m => m.routes)
  },
  {
    path: 'reservas',
    loadChildren: () => import('./reservas/reservas.routes').then(m => m.routes)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./reportes/reportes.routes').then(m => m.routes)
  },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];