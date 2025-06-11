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

export const routes: Routes = [
    {
        path: "mesas", component: ListadoMesasComponent
    },
    {
        path: "mesas/crear", component: CrearMesaComponent
    },
    {
        path: "mesas/editar/:id", component: EditarMesaComponent
    },
    {
        path: "ubicaciones", component: ListadoUbicacionesComponent
    },
    {
        path: "ubicaciones/crear", component: CrearUbicacionComponent
    },
    {
        path: "ubicaciones/editar/:id", component: EditarUbicacionComponent
    },
    {
        path: "horarios", component: ListadoHorariosComponent
    },
    {
        path: "horarios/crear", component: CrearHorarioComponent
    },
    {
        path: "horarios/editar/:id", component: EditarHorarioComponent
    },
    {
        path: 'reservas/crear', component: CrearReservaComponent
    },
    {
        path: 'reservas/confirmar', component: ConfirmarReservasComponent
    },
    {
        path: 'reservas/consultar', component: ConsultarReservasComponent
    },
    {
        path: 'reportes/reservas-por-fecha', component: ReservasPorFechaComponent
    },
    {
        path: "**", redirectTo: "mesas"
    },
];
