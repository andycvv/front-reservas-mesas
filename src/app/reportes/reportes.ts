export interface ReservaReporte {
  reservasPorDia: { [key: string]: number };
  totalReservas: number;
  promedioDiario: number;
  cancelaciones: number;
  numeroDeDias: number;
}
