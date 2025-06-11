import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EstadoReserva, ReservaConsultaDTO, ReservaCreacionDTO, ReservaListadoDTO } from './reservas';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  public crear(reserva: ReservaCreacionDTO) {
    return this.http.post(this.baseUrl + '/reservas', reserva);
  }

  public obtenerTodosPorClienteId(id: number) {
    return this.http.get<ReservaConsultaDTO[]>(this.baseUrl + '/reservas/cliente/' + id)
  }

  public obtenerTodosPendientes() {
    return this.http.get<ReservaListadoDTO[]>(this.baseUrl + '/reservas/pendientes')
  }

  public cambiarEstado(id: number, estado: EstadoReserva) {
    return this.http.patch(this.baseUrl + '/reservas/estado/' + id, {estado})
  }
} 
