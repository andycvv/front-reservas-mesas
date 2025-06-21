import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const token = localStorage.getItem('token')
  const rol = localStorage.getItem('roles')

  if (token) {
    if (rol?.includes('ROLE_ADMINISTRADOR')) {
      router.navigate(['/mesas']);
    } else if (rol?.includes('ROLE_CLIENTE')) {
      router.navigate(['/reservas/crear']);
    } else if (rol?.includes('ROLE_RECEPCIONISTA')) {
      router.navigate(['/reservas/confirmar']);
    } else {
      router.navigate(['/404']);
    }
    return false;
  }

  return true;
};
