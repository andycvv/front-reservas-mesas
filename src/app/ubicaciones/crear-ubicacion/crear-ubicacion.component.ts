import { Component, inject } from '@angular/core';
import { TituloPrincipalComponent } from "../../compartidos/titulo-principal/titulo-principal.component";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UbicacionesService } from '../ubicaciones.service';
import { UbicacionCreacionDTO } from '../ubicaciones';

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
  private ubicacionesService = inject(UbicacionesService);
  private router = inject(Router);

  form = this.formBuilder.group({
    nombre: ['']
  });

  guardarCambios() {
    const ubicacionDTO = this.form.value as UbicacionCreacionDTO;
    this.ubicacionesService.crear(ubicacionDTO).subscribe(() => {
      this.router.navigate(['/ubicaciones']);
    })
  }
}
