import { Component, inject, OnInit } from '@angular/core';
import { TituloPrincipalComponent } from "../../compartidos/titulo-principal/titulo-principal.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { HorarioDTO } from '../horarios';
import { DatePipe } from '@angular/common';
import { HorariosService } from '../horarios.service';
import { convertirHoraStringADate } from '../../compartidos/funciones/convertirFechas';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-listado-horarios',
  imports: [
    TituloPrincipalComponent,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    DatePipe,
    SweetAlert2Module,
    MatPaginatorModule
  ],
  templateUrl: './listado-horarios.component.html',
  styleUrl: './listado-horarios.component.css'
})
export class ListadoHorariosComponent implements OnInit {
  private horariosService = inject(HorariosService);

  horarios: HorarioDTO[] = []
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  ngOnInit(): void {
    this.actualizarListado();
  }

  eliminar(id: number) {
    this.horariosService.eliminar(id).subscribe({
      next: () => {
        this.actualizarListado();
        Swal.fire({
          title: 'Éxito',
          text: 'Horario eliminado correctamente',
          icon: 'success'
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Advertencia',
          text: error.error.message || 'No se pudo eliminar el horario',
          icon: 'warning'
        });
      }
    })
  }

  actualizarListado() {
    this.horariosService.obtenerTodos(this.pageIndex, this.pageSize).subscribe(res => {
      this.horarios = res.content;
      this.totalElements = res.totalElements;
    });
  }
  
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.actualizarListado();
  }
  
  convertirAHoraFecha(hora: string): Date {
    return convertirHoraStringADate(hora)
  }

}
