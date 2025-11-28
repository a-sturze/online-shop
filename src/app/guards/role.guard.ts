import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthFacade } from '../state/auth/auth.facade';

export const roleGuard: CanActivateFn = (route, state) => {
  const authFacade = inject(AuthFacade);
  if (authFacade.hasRole(route.data['role'])) {
    return true;
  }
  return createUrlTreeFromSnapshot(route, ['/products']);
};
