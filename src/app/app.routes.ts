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
        path: "**", redirectTo: "mesas"
    },
    
];
