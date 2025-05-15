import { Component, inject } from '@angular/core';
import { TituloPrincipalComponent } from '../../compartidos/titulo-principal/titulo-principal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crear-mesa',
  imports: [
    TituloPrincipalComponent,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './crear-mesa.component.html',
  styleUrl: './crear-mesa.component.css',
})
export class CrearMesaComponent {
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    numero: [0],
    capacidad: [0],
    ubicacionId: [0],
  });

  ubicaciones = [
    { id: 1, nombre: 'Esquina' },
    { id: 2, nombre: 'Centro' },
    { id: 3, nombre: 'Pared' },
    { id: 4, nombre: 'Ventana' },
  ];

  guardarCambios(){
    console.log(this.form.value)
  }
}
