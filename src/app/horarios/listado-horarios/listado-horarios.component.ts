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

@Component({
  selector: 'app-listado-horarios',
  imports: [
    TituloPrincipalComponent,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    DatePipe,
    SweetAlert2Module
  ],
  templateUrl: './listado-horarios.component.html',
  styleUrl: './listado-horarios.component.css'
})
export class ListadoHorariosComponent implements OnInit {
  private horariosService = inject(HorariosService);

  horarios: HorarioDTO[] = []

  ngOnInit(): void {
    this.actualizarListado();
  }

  eliminar(id: number) {
    this.horariosService.eliminar(id).subscribe(() => {
      this.actualizarListado();
    })
  }

  actualizarListado() {
    this.horariosService.obtenerTodos().subscribe(horarios => {
      this.horarios = horarios
    });
  }
  
  convertirAHoraFecha(hora: string): Date {
    return convertirHoraStringADate(hora)
  }

}
