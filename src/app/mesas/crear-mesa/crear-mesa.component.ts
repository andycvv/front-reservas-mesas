import { Component, inject, OnInit } from '@angular/core';
import { TituloPrincipalComponent } from '../../compartidos/titulo-principal/titulo-principal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { UbicacionesService } from '../../ubicaciones/ubicaciones.service';
import { MesasService } from '../mesas.service';
import { UbicacionDTO } from '../../ubicaciones/ubicaciones';
import { MesaCreacionDTO } from '../mesas';

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
export class CrearMesaComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  private ubicacionesService = inject(UbicacionesService)
  private mesasService = inject(MesasService)
  private router = inject(Router)

  form = this.formBuilder.group({
    numero: [0],
    capacidad: [0],
    ubicacionId: [0],
  });

  ubicaciones: UbicacionDTO[] = [];

  ngOnInit(): void {
    this.ubicacionesService.obtenerTodosActivos().subscribe((ubicaciones) => {
      this.ubicaciones = ubicaciones
    })
  }

  guardarCambios(){
    this.mesasService.crear(this.form.value as MesaCreacionDTO).subscribe(() => {
      this.router.navigate(["/mesas"])
    }) 
  }
}
