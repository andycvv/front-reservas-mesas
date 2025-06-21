import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CrearUsuarioDTO, LoginResponse } from './auth';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = environment.baseUrl
  private http = inject(HttpClient)
  private router = inject(Router)

  private loggedIn = new BehaviorSubject<boolean>(this.isLogged());
  public isLogged$ = this.loggedIn.asObservable();

  private roles = new BehaviorSubject<string[]>([]);
  public roles$ = this.roles.asObservable();

  public cargarEstadoDesdeLocalStorage() {
    const token = localStorage.getItem('token');
    const roles = localStorage.getItem('roles');
    this.loggedIn.next(!!token);
    this.roles.next(roles ? JSON.parse(roles) : []);
  }

  public login(username: string, clave: string) {
    return this.http.post<LoginResponse>(this.baseURL + '/auth/login', { dni: username, clave })
      .pipe(
        tap(data => {
          const { dni, roles, token } = data

          localStorage.setItem("token", token)
          localStorage.setItem("roles", JSON.stringify(roles))
          localStorage.setItem("dni", dni)
          this.roles.next(roles)
          this.loggedIn.next(true)
        })
      )
  }

  public registrar(dto: CrearUsuarioDTO) {
    return this.http.post(this.baseURL + '/auth/registrar', dto)
  }

  public logout() {
    localStorage.clear()
    this.loggedIn.next(false)
    this.roles.next([])
    this.router.navigate(['/auth/login'])
  }

  public isLogged() {
    return !!localStorage.getItem('token');
  }

  public getDni() {
    return localStorage.getItem('dni');
  }
}
