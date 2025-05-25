import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HorarioCreacionDTO, HorarioDTO, HorarioEdicionDTO } from './horarios';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  public obtenerTodos() {
    return this.http.get<HorarioDTO[]>(this.baseUrl + '/horarios');
  }

  public obtenerPorId(id: number) {
    return this.http.get<HorarioDTO>(this.baseUrl + '/horarios/' + id);
  }

  public crear(horario: HorarioCreacionDTO) {
    return this.http.post(this.baseUrl + '/horarios', horario);
  }

  public actualizar(id: number, horario: HorarioEdicionDTO) {
    return this.http.put(this.baseUrl + '/horarios/' + id, horario);
  }

  public eliminar(id: number) {
    return this.http.delete(this.baseUrl + '/horarios/' + id);
  }
}
