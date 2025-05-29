import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ReservaCreacionDTO } from './reservas';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  public crear(reserva: ReservaCreacionDTO) {
    return this.http.post(this.baseUrl + '/reservas', reserva);
  }
}
