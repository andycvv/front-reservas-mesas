export interface LoginResponse {
  mensaje: string;
  dni: string;
  token: string;
  roles: string[];
}

export interface CrearUsuarioDTO {
  dni: string;
  clave: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
}