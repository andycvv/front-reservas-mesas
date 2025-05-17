import { Component } from '@angular/core';
import { TituloPrincipalComponent } from "../../compartidos/titulo-principal/titulo-principal.component";
import { MatIconModule } from '@angular/material/icon';
import { UbicacionCreacionDTO, UbicacionDTO } from '../ubicaciones';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listado-ubicaciones',
  imports: [
    TituloPrincipalComponent,
    MatIconModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './listado-ubicaciones.component.html',
  styleUrl: './listado-ubicaciones.component.css'
})
export class ListadoUbicacionesComponent {
  ubicaciones: UbicacionDTO[] = [
    { id: 1, nombre: 'Centro', estado: true },
    { id: 2, nombre: 'Esquina', estado: false },
    { id: 3, nombre: 'Pared', estado: true },
    { id: 4, nombre: 'Ventana', estado: false }
  ]
}
