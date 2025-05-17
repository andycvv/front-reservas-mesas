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
import { RouterLink } from '@angular/router';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { HorarioCreacionDTO, HorarioDTO } from '../horarios';

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

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    horaDeInicio: new FormControl<Date | null>(null),
    horaDeFin: new FormControl<Date | null>(null),
    estado: [true],
  });

  guardarCambios() {
    console.log(this.form.value);
  }

  ngOnInit(): void {
    const horario: HorarioCreacionDTO = {
      horaDeInicio: this.timeStringToDate('9:00'),
      horaDeFin: this.timeStringToDate('14:00'),
      estado: false,
    };

    this.form.patchValue(horario);
  }

  timeStringToDate(timeStr: string): Date {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date(); // se usará solo la hora y minutos
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
}
