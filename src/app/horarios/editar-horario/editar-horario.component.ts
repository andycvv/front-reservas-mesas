import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import { TituloPrincipalComponent } from '../../compartidos/titulo-principal/titulo-principal.component';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { HorarioEdicionDTO } from '../horarios';
import { HorariosService } from '../horarios.service';
import { convertirDateAHoraString, convertirHoraStringADate } from '../../compartidos/funciones/convertirFechas';

@Component({
  selector: 'app-editar-horario',
  providers: [provideNativeDateAdapter()],
  imports: [
    TituloPrincipalComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterLink,
    MatTimepickerModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './editar-horario.component.html',
  styleUrl: './editar-horario.component.css',
})
export class EditarHorarioComponent implements OnInit {
  @Input({ transform: numberAttribute })
  id!: number;

  private horariosService = inject(HorariosService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)

  form = this.formBuilder.group({
    horaInicio: new FormControl<Date | null>(null),
    horaFin: new FormControl<Date | null>(null),
    estado: [true],
  });

  ngOnInit(): void {
    this.horariosService.obtenerPorId(this.id).subscribe(horario => {
      this.form.patchValue({
        horaInicio: convertirHoraStringADate(horario.horaInicio),
        horaFin: convertirHoraStringADate(horario.horaFin),
        estado: horario.estado
      })
    })
  }

  guardarCambios() {
    const { horaInicio, horaFin, estado } = this.form.value;

    if (!horaInicio || !horaFin) return;

    const horario: HorarioEdicionDTO = {
      horaInicio: convertirDateAHoraString(horaInicio),
      horaFin: convertirDateAHoraString(horaFin),
      estado: estado!
    };

    this.horariosService.actualizar(this.id, horario).subscribe(() => {
      this.router.navigate(['/horarios'])
    });
  }
}
