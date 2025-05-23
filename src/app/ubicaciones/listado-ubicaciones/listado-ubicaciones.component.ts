import { Component, inject, OnInit } from '@angular/core';
import { TituloPrincipalComponent } from "../../compartidos/titulo-principal/titulo-principal.component";
import { MatIconModule } from '@angular/material/icon';
import { UbicacionDTO } from '../ubicaciones';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UbicacionesService } from '../ubicaciones.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-listado-ubicaciones',
  imports: [
    TituloPrincipalComponent,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    SweetAlert2Module
  ],
  templateUrl: './listado-ubicaciones.component.html',
  styleUrl: './listado-ubicaciones.component.css'
})
export class ListadoUbicacionesComponent implements OnInit {
  private ubicacionesService = inject(UbicacionesService);
  ubicaciones: UbicacionDTO[] = [];

  ngOnInit(): void {
    this.actualizarListado();
  }

  actualizarListado() {
    this.ubicacionesService.obtenerTodos().subscribe(ubicaciones => {
      this.ubicaciones = ubicaciones;
    })
  }

  eliminar(id: number) {
    this.ubicacionesService.eliminar(id).subscribe(() => {
      this.actualizarListado();
    })
  }
}
