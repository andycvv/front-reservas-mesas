import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function horaInicioMenorQueHoraFin(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const horaInicio = control.get('horaInicio')?.value;
    const horaFin = control.get('horaFin')?.value;

    if (!horaInicio || !horaFin) {
      return null;
    }

    const inicio = new Date(horaInicio).getTime();
    const fin = new Date(horaFin).getTime();

    if (inicio >= fin) {
      return { horaInicioInvalida: true };
    }

    return null;
  };
}