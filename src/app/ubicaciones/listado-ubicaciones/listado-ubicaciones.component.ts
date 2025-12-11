import { Component, inject, OnInit } from '@angular/core';
import { TituloPrincipalComponent } from "../../compartidos/titulo-principal/titulo-principal.component";
import { MatIconModule } from '@angular/material/icon';
import { UbicacionDTO } from '../ubicaciones';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UbicacionesService } from '../ubicaciones.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-listado-ubicaciones',
  imports: [
    TituloPrincipalComponent,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    SweetAlert2Module,
    MatPaginatorModule
  ],
  templateUrl: './listado-ubicaciones.component.html',
  styleUrl: './listado-ubicaciones.component.css'
})
export class ListadoUbicacionesComponent implements OnInit {
  private ubicacionesService = inject(UbicacionesService);
  ubicaciones: UbicacionDTO[] = [];
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  ngOnInit(): void {
    this.actualizarListado();
  }

  actualizarListado() {
    this.ubicacionesService.obtenerTodos(this.pageIndex, this.pageSize).subscribe(res => {
      this.ubicaciones = res.content;
      this.totalElements = res.totalElements;
    })
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.actualizarListado();
  }

  eliminar(id: number) {
    this.ubicacionesService.eliminar(id).subscribe({
      next: () => {
        this.actualizarListado();
        Swal.fire({
          title: 'Éxito',
          text: 'Ubicación eliminada correctamente',
          icon: 'success'
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Advertencia',
          text: error.error.message || 'No se pudo eliminar la ubicación',
          icon: 'warning'
        });
      }
    })
  }
}
