import { Routes } from '@angular/router';
import { ListadoMesasComponent } from './mesas/listado-mesas/listado-mesas.component';
import { CrearMesaComponent } from './mesas/crear-mesa/crear-mesa.component';
import { EditarMesaComponent } from './mesas/editar-mesa/editar-mesa.component';
import { ListadoUbicacionesComponent } from './ubicaciones/listado-ubicaciones/listado-ubicaciones.component';
import { CrearUbicacionComponent } from './ubicaciones/crear-ubicacion/crear-ubicacion.component';
import { EditarUbicacionComponent } from './ubicaciones/editar-ubicacion/editar-ubicacion.component';
import { ListadoHorariosComponent } from './horarios/listado-horarios/listado-horarios.component';
import { CrearHorarioComponent } from './horarios/crear-horario/crear-horario.component';
import { EditarHorarioComponent } from './horarios/editar-horario/editar-horario.component';
import { CrearReservaComponent } from './reservas/crear-reserva/crear-reserva.component';
import { ConfirmarReservasComponent } from './reservas/confirmar-reservas/confirmar-reservas.component';
import { ConsultarReservasComponent } from './reservas/consultar-reservas/consultar-reservas.component';
import { ReservasPorFechaComponent } from './reportes/reservas-por-fecha/reservas-por-fecha.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { roleGuard } from './auth/role.guard';
import { authGuard } from './auth/auth.guard';
import { Roles } from './auth/roles';
import { NotFoundComponent } from './auth/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  { path: 'auth/login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'auth/registrar', component: RegistrarComponent, canActivate: [authGuard] },

  {
    path: 'mesas',
    canActivate: [roleGuard],
    data: { role: Roles.ADMIN },
    children: [
      { path: '', component: ListadoMesasComponent },
      { path: 'crear', component: CrearMesaComponent },
      { path: 'editar/:id', component: EditarMesaComponent }
    ]
  },

  {
    path: 'ubicaciones',
    canActivate: [roleGuard],
    data: { role: Roles.ADMIN },
    children: [
      { path: '', component: ListadoUbicacionesComponent },
      { path: 'crear', component: CrearUbicacionComponent },
      { path: 'editar/:id', component: EditarUbicacionComponent }
    ]
  },

  {
    path: 'horarios',
    canActivate: [roleGuard],
    data: { role: Roles.ADMIN },
    children: [
      { path: '', component: ListadoHorariosComponent },
      { path: 'crear', component: CrearHorarioComponent },
      { path: 'editar/:id', component: EditarHorarioComponent }
    ]
  },

  {
    path: 'reservas',
    children: [
      {
        path: 'crear',
        component: CrearReservaComponent,
        canActivate: [roleGuard],
        data: { role: Roles.CLIENTE }
      },
      {
        path: 'consultar',
        component: ConsultarReservasComponent,
        canActivate: [roleGuard],
        data: { role: Roles.CLIENTE }
      },
      {
        path: 'confirmar',
        component: ConfirmarReservasComponent,
        canActivate: [roleGuard],
        data: { role: Roles.RECEPCIONISTA }
      }
    ]
  },

  {
    path: 'reportes',
    canActivate: [roleGuard],
    data: { role: Roles.ADMIN },
    children: [
      { path: 'reservas-por-fecha', component: ReservasPorFechaComponent }
    ]
  },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];