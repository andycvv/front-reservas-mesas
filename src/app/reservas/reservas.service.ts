import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EstadoReserva, ReservaCreacionDTO, ReservaListadoDTO } from './reservas';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  public crear(reserva: ReservaCreacionDTO) {
    return this.http.post(this.baseUrl + '/reservas', reserva);
  }

  public obtenerTodosHoy() {
    return this.http.get<ReservaListadoDTO[]>(this.baseUrl + '/reservas')
  }

  public cambiarEstado(id: number, estado: EstadoReserva) {
    return this.http.patch(this.baseUrl + '/reservas/estado/' + id, estado)
  }
} 
