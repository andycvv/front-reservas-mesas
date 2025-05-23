import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { TituloPrincipalComponent } from '../../compartidos/titulo-principal/titulo-principal.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { UbicacionDTO, UbicacionEdicionDTO } from '../ubicaciones';
import { UbicacionesService } from '../ubicaciones.service';

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
  private ubicacionesService = inject(UbicacionesService);
  private router = inject(Router);

  form = this.formBuilder.group({
    nombre: [''],
    estado: [false]
  });

  ngOnInit(): void {
    this.ubicacionesService.obtenerPorId(this.id).subscribe(ubicacion => {
      this.form.patchValue(ubicacion);
    })

  }

  guardarCambios() {
    const ubicacion = this.form.value as UbicacionEdicionDTO;

    this.ubicacionesService.actualizar(this.id, ubicacion).subscribe(() => {
      this.router.navigate(['/ubicaciones']);
    });
  }
}
