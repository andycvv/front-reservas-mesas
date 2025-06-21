import { Routes } from "@angular/router";
import { roleGuard } from "../auth/role.guard";
import { Roles } from "../auth/roles";
import { ListadoHorariosComponent } from "./listado-horarios/listado-horarios.component";
import { CrearHorarioComponent } from "./crear-horario/crear-horario.component";
import { EditarHorarioComponent } from "./editar-horario/editar-horario.component";

export const routes: Routes = [
  {
    path: '',
    canActivate: [roleGuard],
    data: { role: Roles.ADMIN },
    children: [
      { path: '', component: ListadoHorariosComponent },
      { path: 'crear', component: CrearHorarioComponent },
      { path: 'editar/:id', component: EditarHorarioComponent }
    ]
  }
]