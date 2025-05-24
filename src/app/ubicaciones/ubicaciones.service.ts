import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UbicacionCreacionDTO, UbicacionDTO, UbicacionEdicionDTO } from './ubicaciones';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  public obtenerTodos() {
    return this.http.get<UbicacionDTO[]>(this.baseUrl + '/ubicaciones');
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
