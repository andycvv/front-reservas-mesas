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

  listarReservas() {
    this.reservasService.obtenerTodosDelCliente().subscribe((data) => {
      this.reservasOriginales = data;
      this.reservas = data;
    });
  }

  toLocalDateString = (date: Date) => date.toISOString().slice(0, 10);

  buscarReservas(valores: FiltroReservasCliente) {
    if (valores.fecha) {
      this.reservas = this.reservas.filter((reserva) => {
        const fechaReserva = new Date(reserva.fecha);
        const fechaFiltro = valores.fecha;
        return (
          this.toLocalDateString(fechaReserva) === this.toLocalDateString(fechaFiltro)
        );
      });
    }

    if (valores.estado) {
      this.reservas = this.reservas.filter(
        (reserva) => reserva.estado === valores.estado
      );
    }
  }

  ngOnInit(): void {
    this.listarReservas();
    this.form.valueChanges.subscribe((valores) => {
      this.reservas = this.reservasOriginales;
      this.buscarReservas(valores as FiltroReservasCliente);
    });
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
  }
}
