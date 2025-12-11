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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

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
    SweetAlert2Module,
    MatPaginatorModule
  ],
  templateUrl: './confirmar-reservas.component.html',
  styleUrl: './confirmar-reservas.component.css'
})
export class ConfirmarReservasComponent implements OnInit {
  reservasOriginales: ReservaListadoDTO[] = [];
  reservas: ReservaListadoDTO[] = [];
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

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

    this.mesasService.obtenerTodos().subscribe(res => this.mesas = res.content);

    this.form.valueChanges.subscribe(valores => {
      this.reservas = this.reservasOriginales
    })
  }

  listarReservas() {
    this.reservasService.obtenerTodosPendientes(
      this.pageIndex, 
      this.pageSize, 
      this.form.value.nombreCliente, 
      this.form.value.numeroMesa
    ).subscribe(res => {
      this.reservasOriginales = res.content
      this.reservas = res.content;
      this.totalElements = res.totalElements;
    })
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listarReservas();
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

  limpiarFiltros() {
    this.form.reset({
      nombreCliente: '',
      numeroMesa: 0
    });
    this.listarReservas();
  }
}
