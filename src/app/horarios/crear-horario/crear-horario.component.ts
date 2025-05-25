import { Component, inject } from '@angular/core';
import { TituloPrincipalComponent } from "../../compartidos/titulo-principal/titulo-principal.component";
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { HorariosService } from '../horarios.service';
import { HorarioCreacionDTO } from '../horarios';
import { convertirDateAHoraString } from '../../compartidos/funciones/convertirFechas';


@Component({
  selector: 'app-crear-horario',
  providers: [provideNativeDateAdapter()],
  imports: [
    TituloPrincipalComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterLink,
    MatTimepickerModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './crear-horario.component.html',
  styleUrl: './crear-horario.component.css'
})
export class CrearHorarioComponent {
  private horariosService = inject(HorariosService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)

  form = this.formBuilder.group({
    horaInicio: new FormControl<Date | null>(null),
    horaFin: new FormControl<Date | null>(null)
  })

  guardarCambios() {
    const { horaInicio, horaFin } = this.form.value;

    if (!horaInicio || !horaFin) return;
      
    const horario: HorarioCreacionDTO = {
      horaInicio: convertirDateAHoraString(horaInicio),
      horaFin: convertirDateAHoraString(horaFin),
    };

    this.horariosService.crear(horario).subscribe(() => {
      this.router.navigate(['/horarios'])
    });
  }
}
