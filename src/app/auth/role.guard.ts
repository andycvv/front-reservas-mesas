import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  const roleEsperado = route.data['role']
  const roles = localStorage.getItem('roles')

  if (!roles) return false
  if (roles.includes(roleEsperado)) return true

  if (roles.includes('ROLE_ADMINISTRADOR')) {
    router.navigate(['/mesas']);
  } else if (roles.includes('ROLE_CLIENTE')) {
    router.navigate(['/reservas/crear']);
  } else if (roles.includes('ROLE_RECEPCIONISTA')) {
    router.navigate(['/reservas/confirmar']);
  } else {
    router.navigate(['/404']);
  }
  return false;
};
