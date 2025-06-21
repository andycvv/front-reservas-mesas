import { Component, inject } from '@angular/core';
import { TituloPrincipalComponent } from "../../compartidos/titulo-principal/titulo-principal.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    TituloPrincipalComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)
  error = false;

  form = this.fb.group({
    dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    clave: ['', [Validators.required, Validators.min(3)]]
  })

  ingresar() {
    const { dni, clave } = this.form.value

    if (!dni && !clave) return;

    this.authService.login(dni!, clave!).subscribe({
      next: data => {
        const { roles } = data

        let ruta = ''

        if (roles.includes('ROLE_CLIENTE')) ruta = '/reservas/crear'
        if (roles.includes('ROLE_ADMINISTRADOR')) ruta = '/mesas'
        if (roles.includes('ROLE_RECEPCIONISTA')) ruta = '/reservas/confirmar'

        this.router.navigate([ruta])
      },
      error: () => {
        this.error = true
      }
    })
  }
}
