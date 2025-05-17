import { Component, inject } from '@angular/core';
import { TituloPrincipalComponent } from "../../compartidos/titulo-principal/titulo-principal.component";
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';


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

  private formBuilder = inject(FormBuilder) 

  form = this.formBuilder.group({
    horaDeInicio: new FormControl<Date | null> (null),
    horaDeFin: new FormControl<Date | null> (null)
  }) 

  guardarCambios(){
    console.log(this.form.value)
  }
}
