import { Routes } from "@angular/router";
import { CrearReservaComponent } from "./crear-reserva/crear-reserva.component";
import { ConsultarReservasComponent } from "./consultar-reservas/consultar-reservas.component";
import { ConfirmarReservasComponent } from "./confirmar-reservas/confirmar-reservas.component";
import { roleGuard } from "../auth/role.guard";
import { Roles } from "../auth/roles";

export const routes: Routes = [
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
];