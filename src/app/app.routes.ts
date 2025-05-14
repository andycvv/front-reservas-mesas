import { Routes } from '@angular/router';
import { ListadoMesasComponent } from './mesas/listado-mesas/listado-mesas.component';
import { CrearMesaComponent } from './mesas/crear-mesa/crear-mesa.component';
import { EditarMesaComponent } from './mesas/editar-mesa/editar-mesa.component';

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
        path: "**", redirectTo: "mesas"
    }
];
