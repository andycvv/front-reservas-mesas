import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MesaCreacionDTO, MesaDTO, MesaEdicionDTO, MesaListadoDTO } from './mesas';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  private baseURL = environment.baseUrl
  private http = inject(HttpClient)

  public obtenerTodos() {
    return this.http.get<MesaListadoDTO[]>(this.baseURL + "/mesas")
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
