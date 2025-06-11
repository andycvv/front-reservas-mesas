import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReservaReporte } from './reportes';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private baseUrl = environment.baseUrl
  private http = inject(HttpClient)

  getReservasPorFecha(fechaInicio: Date, fechaFin: Date) {
    const params = new HttpParams()
      .set('inicio', fechaInicio.toISOString().split('T')[0])
      .set('fin', fechaFin.toISOString().split('T')[0]);

    return this.http.get<ReservaReporte>(this.baseUrl + '/reportes/reservas-por-fecha', { params });
  }
}
