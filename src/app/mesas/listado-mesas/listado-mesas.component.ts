import { Component } from '@angular/core';
import { TituloPrincipalComponent } from '../../compartidos/titulo-principal/titulo-principal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MesaListadoDTO } from '../mesas';

@Component({
  selector: 'app-listado-mesas',
  imports: [
    TituloPrincipalComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './listado-mesas.component.html',
  styleUrl: './listado-mesas.component.css',
})
export class ListadoMesasComponent {
  mesas: MesaListadoDTO[] = [
    { id: 1, numero: 3, capacidad: 2, estado: true, ubicacion: 'Ventana' },
    { id: 2, numero: 5, capacidad: 10, estado: true, ubicacion: 'Pared' },
    { id: 3, numero: 10, capacidad: 2, estado: false, ubicacion: 'Esquina' },
    { id: 4, numero: 7, capacidad: 8, estado: true, ubicacion: 'Centro' },
  ];
}
