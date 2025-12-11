import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HorarioCreacionDTO, HorarioDTO, HorarioEdicionDTO } from './horarios';
import { PageableResponse } from '../compartidos/interfaces/pageable-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  public obtenerTodos(page: number = 0, size: number = 10) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageableResponse<HorarioDTO[]>>(this.baseUrl + '/horarios', { params });
  }

  public obtenerTodosActivos() {
    return this.http.get<HorarioDTO[]>(this.baseUrl + '/horarios/activos');
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
