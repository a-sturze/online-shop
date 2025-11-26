import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const user = authService.user();
  if (user && user.roles.includes(route.data['role'])) {
    return true;
  }
  return createUrlTreeFromSnapshot(route, ['/products']);
};
