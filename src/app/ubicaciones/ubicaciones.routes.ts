import { roleGuard } from "../auth/role.guard";
import { Roles } from "../auth/roles";
import { CrearUbicacionComponent } from "./crear-ubicacion/crear-ubicacion.component";
import { EditarUbicacionComponent } from "./editar-ubicacion/editar-ubicacion.component";
import { ListadoUbicacionesComponent } from "./listado-ubicaciones/listado-ubicaciones.component";

export const routes = [
  {
    path: '',
    canActivate: [roleGuard],
    data: { role: Roles.ADMIN },
    children: [
      { path: '', component: ListadoUbicacionesComponent },
      { path: 'crear', component: CrearUbicacionComponent },
      { path: 'editar/:id', component: EditarUbicacionComponent }
    ]
  }
]