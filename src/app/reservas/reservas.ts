export interface ReservaCreacionDTO {
  clienteId: number;
  nombreEnReserva: string;
  telefonoEnReserva: string;
  dni: string;
  mesaId: number;
  horarioId: number;
  fechaDeReserva: Date;
}