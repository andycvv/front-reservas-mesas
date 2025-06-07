import { Component, inject, OnInit } from '@angular/core';
import { TituloPrincipalComponent } from "../../compartidos/titulo-principal/titulo-principal.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FiltroReservas, ReservaListadoDTO } from '../reservas';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MesaListadoDTO } from '../../mesas/mesas';
import { MesasService } from '../../mesas/mesas.service';
import { ReservasService } from '../reservas.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-confirmar-reservas',
  imports: [
    TituloPrincipalComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    DatePipe,
    SweetAlert2Module
  ],
  templateUrl: './confirmar-reservas.component.html',
  styleUrl: './confirmar-reservas.component.css'
})
export class ConfirmarReservasComponent implements OnInit {
  reservasOriginales: ReservaListadoDTO[] = [];
  reservas: ReservaListadoDTO[] = [];

  mesas: MesaListadoDTO[] = [];

  formBuilder = inject(FormBuilder);
  mesasService = inject(MesasService);
  reservasService = inject(ReservasService);

  form = this.formBuilder.group({
    nombreCliente: [''],
    numeroMesa: [0]
  });

  ngOnInit(): void {
    this.listarReservas();

    this.mesasService.obtenerTodos().subscribe(mesas => this.mesas = mesas)

    this.form.valueChanges.subscribe(valores => {
      this.reservas = this.reservasOriginales
      this.buscarReservas(valores as FiltroReservas);
    })
  }

  listarReservas() {
    this.reservasService.obtenerTodosHoy().subscribe(reservas => {
      this.reservasOriginales = reservas
      this.reservas = reservas;
    })
  }

  buscarReservas(valores: FiltroReservas) {
    if (valores.nombreCliente) {
      this.reservas = this.reservas
        .filter(reserva => reserva.nombreCliente.indexOf(valores.nombreCliente) !== -1)
    }

    if (valores.numeroMesa !== 0) {
      this.reservas = this.reservas
        .filter(reserva => reserva.numeroMesa === valores.numeroMesa)
    }
  }

  confirmar(id: number) {
    this.reservasService.cambiarEstado(id, 'CONFIRMADA').subscribe(() => {
      this.listarReservas();
    })
  }

  rechazar(id: number) {
    this.reservasService.cambiarEstado(id, 'CANCELADA').subscribe(() => {
      this.listarReservas();
    })
  }
}
