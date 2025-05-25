export function convertirHoraStringADate(hora: string): Date {
  const [horas, minutos, segundos] = hora.split(':').map(Number);
  const fecha = new Date();
  fecha.setHours(horas, minutos, segundos || 0, 0);
  return fecha;
}

export function convertirDateAHoraString(date: Date): string {
  const horas = date.getHours().toString().padStart(2, '0');
  const minutos = date.getMinutes().toString().padStart(2, '0');
  const segundos = date.getSeconds().toString().padStart(2, '0');
  return `${horas}:${minutos}:${segundos}`;
}
