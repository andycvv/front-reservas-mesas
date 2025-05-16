import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { TituloPrincipalComponent } from '../../compartidos/titulo-principal/titulo-principal.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { UbicacionDTO } from '../ubicaciones';

@Component({
  selector: 'app-editar-ubicacion',
  imports: [
    TituloPrincipalComponent,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    MatRadioModule
  ],
  templateUrl: './editar-ubicacion.component.html',
  styleUrl: './editar-ubicacion.component.css'
})
export class EditarUbicacionComponent implements OnInit {
  @Input({ transform: numberAttribute })
  id!: number;

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    nombre: [''],
    estado: [false]
  });

  ngOnInit(): void {
    const ubicacion: UbicacionDTO = {
      id: this.id,
      nombre: 'Centro',
      estado: true
    }

    this.form.patchValue(ubicacion);
  }

  guardarCambios() {
    console.log(this.form.value)
  }
}
