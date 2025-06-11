import { Component, inject, OnInit } from '@angular/core';
import { TituloPrincipalComponent } from "../../compartidos/titulo-principal/titulo-principal.component";
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ReservaReporte } from '../reportes';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ReportesService } from '../reportes.service';
import { DecimalPipe } from '@angular/common';
import { generarReportePdf } from '../../compartidos/utils/pdf';

@Component({
  selector: 'app-reservas-por-fecha',
  imports: [
    TituloPrincipalComponent,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatChipsModule,
    MatIconModule,
    DecimalPipe
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './reservas-por-fecha.component.html',
  styleUrl: './reservas-por-fecha.component.css'
})
export class ReservasPorFechaComponent {
  private formBuilder = inject(FormBuilder)
  private reportesService = inject(ReportesService)

  range = this.formBuilder.group({
    fechaInicio: new FormControl<Date | null>(null),
    fechaFin: new FormControl<Date | null>(null)
  })

  diasDeLaSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  reporte: ReservaReporte | null = null

  today = new Date();

  deshabilitarFuturas = (fecha: Date | null): boolean => {
    if (!fecha) return false;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return fecha < hoy;
  };


  consultar() {
    const { fechaInicio, fechaFin } = this.range.value

    if (!fechaInicio || !fechaFin) return;

    this.reportesService.getReservasPorFecha(fechaInicio, fechaFin).subscribe(reporte => {
      this.reporte = reporte
    })
  }

  generarPDF() {
    if (!this.reporte) return;

    const fechaInicio = this.range.value.fechaInicio!;
    const fechaFin = this.range.value.fechaFin!;

    generarReportePdf(this.reporte, this.diasDeLaSemana, fechaInicio, fechaFin);
  }

  calcularPorcentaje(valor: number): number {
    return (valor / this.reporte!.totalReservas!) * 100;
  }
}
