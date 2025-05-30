export interface ReservaCreacionDTO {
  fecha: Date;
  clienteId: number;
  mesaId: number;
  horarioId: number;
}

export interface ReservaListadoDTO {
  id: number;
  nombreCliente: string;
  dniCliente: string;
  telefonoCliente: string;
  fecha: Date;
  horaInicio: string;
  horaFin: string;
  numeroMesa: number;
  capacidadMesa: number;
}

export interface FiltroReservas {
  nombreCliente: string;
  numeroMesa: number;
}

export type EstadoReserva = {
  estado: 'CONFIRMADA' | 'CANCELADA'
}