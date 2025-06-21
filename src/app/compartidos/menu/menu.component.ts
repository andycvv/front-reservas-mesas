import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  private authService = inject(AuthService)
  isLogged = false;
  roles: string[] = [];

  ngOnInit(): void {
    this.authService.cargarEstadoDesdeLocalStorage();
    this.authService.isLogged$.subscribe(isLogged => this.isLogged = isLogged)
    this.authService.roles$.subscribe(roles => this.roles = roles)
  }
  
  salir() {
    this.authService.logout()
  }
}
