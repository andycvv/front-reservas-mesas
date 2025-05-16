import { Component, inject } from '@angular/core';
import { TituloPrincipalComponent } from "../../compartidos/titulo-principal/titulo-principal.component";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crear-ubicacion',
  imports: [
    TituloPrincipalComponent,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './crear-ubicacion.component.html',
  styleUrl: './crear-ubicacion.component.css'
})
export class CrearUbicacionComponent {
  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    nombre: ['']
  });

  guardarCambios() {
    console.log(this.form.value)
  }
}
