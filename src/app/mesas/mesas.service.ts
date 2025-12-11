import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MesaCreacionDTO, MesaDTO, MesaEdicionDTO, MesaListadoDTO } from './mesas';
import { PageableResponse } from '../compartidos/interfaces/pageable-response.interface';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  private baseURL = environment.baseUrl
  private http = inject(HttpClient)

  public obtenerTodos(page: number = 0, size: number = 10) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageableResponse<MesaListadoDTO[]>>(this.baseURL + "/mesas", { params })
  }

  public obtenerTodosActivos() {
    return this.http.get<MesaListadoDTO[]>(this.baseURL + "/mesas/activos")
  }

  public obtenerTodosDisponibles(fecha: string, horarioId: number, capacidad: number) {
    let params = new HttpParams();

    params = params.append('fecha', fecha);
    params = params.append('horarioId', horarioId.toString());
    params = params.append('capacidad', capacidad.toString());

    return this.http.get<MesaListadoDTO[]>(this.baseURL + "/mesas/disponibles", { params: params })
  }

  public obtenerPorId(id: number) {
    return this.http.get<MesaDTO>(this.baseURL + "/mesas/" + id)
  }

  public crear(mesa: MesaCreacionDTO) {
    return this.http.post(this.baseURL + "/mesas", mesa)
  }

  public actualizar(id: number, mesa: MesaEdicionDTO) {
    return this.http.put(this.baseURL + "/mesas/" + id, mesa)
  }

  public eliminar(id: number) {
    return this.http.delete(this.baseURL + "/mesas/" + id)
  }
}
