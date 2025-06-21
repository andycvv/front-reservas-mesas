import { Routes } from "@angular/router";
import { roleGuard } from "../auth/role.guard";
import { Roles } from "../auth/roles";
import { ReservasPorFechaComponent } from "./reservas-por-fecha/reservas-por-fecha.component";

export const routes: Routes = [
  {
    path: '',
    canActivate: [roleGuard],
    data: { role: Roles.ADMIN },
    children: [
      { path: '', component: ReservasPorFechaComponent },
    ]
  }
]