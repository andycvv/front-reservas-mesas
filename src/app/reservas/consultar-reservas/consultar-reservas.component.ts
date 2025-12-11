import { Component, inject, OnInit } from '@angular/core';
import { TituloPrincipalComponent } from '../../compartidos/titulo-principal/titulo-principal.component';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DatePipe, NgClass } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ReservasService } from '../reservas.service';
import {
  EstadoReserva,
  FiltroReservasCliente,
  ReservaConsultaDTO,
} from '../reservas';
import { convertirHoraStringADate } from '../../compartidos/funciones/convertirFechas';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-consultar-reservas',
  imports: [
    TituloPrincipalComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    SweetAlert2Module,
    DatePipe,
    MatDatepickerModule,
    NgClass,
    MatPaginatorModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './consultar-reservas.component.html',
  styleUrl: './consultar-reservas.component.css',
})
export class ConsultarReservasComponent implements OnInit {
  private fb = inject(FormBuilder);
  private reservasService = inject(ReservasService);

  form = this.fb.group({
    fecha: new FormControl<Date | null>(null),
    estado: new FormControl<EstadoReserva | null>(null),
  });

  reservasOriginales: ReservaConsultaDTO[] = [];
  reservas: ReservaConsultaDTO[] = [];
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  listarReservas() {
    const estado = this.form.value.estado;
    const fechaConvertida = this.form.value.fecha ? this.toLocalDateString(this.form.value.fecha) : null;

    this.reservasService.obtenerTodosDelCliente(this.pageIndex, this.pageSize, estado, fechaConvertida).subscribe((res) => {
      this.reservasOriginales = res.content;
      this.reservas = res.content;
      this.totalElements = res.totalElements;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listarReservas();
  }

  toLocalDateString = (date: Date) => date.toISOString().slice(0, 10);

  ngOnInit(): void {
    this.listarReservas();
  }

  rechazar(id: number) {
    this.reservasService.cancelar(id).subscribe(() => {
      this.listarReservas();
    });
  }

  limpiarFiltros(){
    this.form.patchValue({
      fecha: null,
      estado: null
    })
    this.listarReservas();
  }
}
