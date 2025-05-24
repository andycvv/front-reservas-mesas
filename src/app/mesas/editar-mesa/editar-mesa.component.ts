import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { TituloPrincipalComponent } from '../../compartidos/titulo-principal/titulo-principal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MesaDTO, MesaEdicionDTO } from '../mesas';
import { MesasService } from '../mesas.service';
import { UbicacionesService } from '../../ubicaciones/ubicaciones.service';
import { UbicacionDTO, UbicacionEdicionDTO } from '../../ubicaciones/ubicaciones';

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
  private mesasService = inject(MesasService);
  private ubicacionesService = inject(UbicacionesService)
  private router = inject(Router)

  @Input({transform: numberAttribute})
  id!: number;

  form = this.formBuilder.group({
    numero: [0],
    capacidad: [0],
    ubicacionId: [0],
    estado: [true],
  });

  ubicaciones: UbicacionDTO[] = [];

  ngOnInit(): void {
    this.mesasService.obtenerPorId(this.id).subscribe((mesa) => {
      this.form.patchValue(mesa)
    })

    this.ubicacionesService.obtenerTodosActivos().subscribe((ubicaciones) => {
      this.ubicaciones = ubicaciones
    })
  }

  guardarCambios() {
    this.mesasService.actualizar(this.id, this.form.value as MesaEdicionDTO).subscribe(() => {
      this.router.navigate(['/mesas'])
    })
  }
}
