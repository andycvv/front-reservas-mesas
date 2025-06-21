import { Component, inject } from '@angular/core';
import { TituloPrincipalComponent } from "../../compartidos/titulo-principal/titulo-principal.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { CrearUsuarioDTO } from '../auth';


@Component({
  selector: 'app-registrar',
  imports: [
    TituloPrincipalComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)

  form = this.fb.group({
    dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    clave: ['', [Validators.required, Validators.minLength(3)]],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellidoPaterno: ['', [Validators.required, Validators.minLength(3)]],
    apellidoMaterno: ['', [Validators.required, Validators.minLength(3)]],
    telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]]
  })

  registrar() {
    this.authService.registrar(this.form.value as CrearUsuarioDTO).subscribe(() => {
      this.router.navigate(['/auth/login'])
    })
  }
}
