import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EstadoReserva, ReservaConsultaDTO, ReservaCreacionDTO, ReservaListadoDTO } from './reservas';
import { PageableResponse } from '../compartidos/interfaces/pageable-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  public crear(reserva: ReservaCreacionDTO) {
    return this.http.post(this.baseUrl + '/reservas', reserva);
  }

  public obtenerTodosDelCliente(page: number = 0, size: number = 10, estado: EstadoReserva | null = null, fecha: string | null = null) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (estado) {
      params = params.set('estado', estado);
    }

    if (fecha) {
      params = params.set('fecha', fecha);
    }

    return this.http.get<PageableResponse<ReservaConsultaDTO[]>>(this.baseUrl + '/reservas/mis-reservas', { params })
  }

  public obtenerTodosPendientes(page: number = 0, size: number = 10, nombre: string | null = null, numero: number | null = null) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (nombre) {
      params = params.set('nombre', nombre);
    }

    if (numero) {
      params = params.set('numero', numero.toString());
    }

    return this.http.get<PageableResponse<ReservaListadoDTO[]>>(this.baseUrl + '/reservas/pendientes', { params })
  }

  public cambiarEstado(id: number, estado: EstadoReserva) {
    return this.http.patch(this.baseUrl + '/reservas/estado/' + id, { estado })
  }

  public cancelar(id: number) {
    return this.http.patch(this.baseUrl + '/reservas/cancelar/' + id, null)
  }
} 
