import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.user();
  if (user && user.roles.includes(route.data['role'])) {
    return true;
  }
  router.navigate(['/products']);
  return false;
};
