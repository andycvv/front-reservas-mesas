import { Routes } from "@angular/router";
import { roleGuard } from "../auth/role.guard";
import { Roles } from "../auth/roles";
import { ListadoMesasComponent } from "./listado-mesas/listado-mesas.component";
import { CrearMesaComponent } from "./crear-mesa/crear-mesa.component";
import { EditarMesaComponent } from "./editar-mesa/editar-mesa.component";

export const routes: Routes = [
  {
    path: '',
    canActivate: [roleGuard],
    data: { role: Roles.ADMIN },
    children: [
      { path: '', component: ListadoMesasComponent },
      { path: 'crear', component: CrearMesaComponent },
      { path: 'editar/:id', component: EditarMesaComponent }
    ]
  }
]