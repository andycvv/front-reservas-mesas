import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { TituloPrincipalComponent } from '../../compartidos/titulo-principal/titulo-principal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MesaDTO } from '../mesas';

@Component({
  selector: 'app-editar-mesa',
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
  templateUrl: './editar-mesa.component.html',
  styleUrl: './editar-mesa.component.css',
})
export class EditarMesaComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  @Input({transform: numberAttribute})
  id!: number;

  form = this.formBuilder.group({
    numero: [0],
    capacidad: [0],
    ubicacionId: [0],
    estado: [true],
  });

  ubicaciones = [
    { id: 1, nombre: 'Esquina' },
    { id: 2, nombre: 'Centro' },
    { id: 3, nombre: 'Pared' },
    { id: 4, nombre: 'Ventana' },
  ];

  guardarCambios() {
    console.log(this.form.value)
  }

  ngOnInit(): void {
    console.log(this.id);
    const mesa: MesaDTO = {
      id: this.id,
      numero: 7,
      capacidad: 2,
      estado: true,
      ubicacionId: 1
    }
    this.form.patchValue(mesa);
  }
}
