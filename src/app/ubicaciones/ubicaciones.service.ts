import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UbicacionCreacionDTO, UbicacionDTO, UbicacionEdicionDTO } from './ubicaciones';
import { environment } from '../../environments/environment';
import { PageableResponse } from '../compartidos/interfaces/pageable-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  public obtenerTodos(page: number = 0, size: number = 10) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageableResponse<UbicacionDTO[]>>(this.baseUrl + '/ubicaciones', { params });
  }

  public obtenerTodosActivos() {
    return this.http.get<UbicacionDTO[]>(this.baseUrl + '/ubicaciones/activos')
  }

  public obtenerPorId(id: number) {
    return this.http.get<UbicacionDTO>(this.baseUrl + '/ubicaciones/' + id);
  }

  public crear(ubicacionDTO: UbicacionCreacionDTO) {
    return this.http.post(this.baseUrl + '/ubicaciones', ubicacionDTO);
  }

  public actualizar(id: number, ubicaciondDTO: UbicacionEdicionDTO) {
    return this.http.put(this.baseUrl + '/ubicaciones/' + id, ubicaciondDTO);
  }

  public eliminar(id: number) {
    return this.http.delete(this.baseUrl + '/ubicaciones/' + id);
  }
}
