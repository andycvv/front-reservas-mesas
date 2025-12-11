import { Component, inject, OnInit } from '@angular/core';
import { TituloPrincipalComponent } from '../../compartidos/titulo-principal/titulo-principal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MesaListadoDTO } from '../mesas';
import { MesasService } from '../mesas.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-listado-mesas',
  imports: [
    TituloPrincipalComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    SweetAlert2Module,
    MatPaginatorModule
  ],
  templateUrl: './listado-mesas.component.html',
  styleUrl: './listado-mesas.component.css',
})
export class ListadoMesasComponent implements OnInit{
  private mesasService = inject(MesasService)

  mesas: MesaListadoDTO[] = [];
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  ngOnInit(): void {
    this.actualizarListado()
  }

  actualizarListado() {
    this.mesasService.obtenerTodos(this.pageIndex, this.pageSize).subscribe((res) => {
      this.mesas = res.content;
      this.totalElements = res.totalElements;
    })
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.actualizarListado();
  }

  eliminar(id: number) {
    this.mesasService.eliminar(id).subscribe({
      next: () => {
        this.actualizarListado();
        Swal.fire({
          title: 'Éxito',
          text: 'Mesa eliminada correctamente',
          icon: 'success'
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Advertencia',
          text: error.error.message || 'No se pudo eliminar la mesa',
          icon: 'warning'
        });
      }
    })
  }
  
}
