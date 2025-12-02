import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthFacade } from '../state/auth/auth.facade';

export const authGuard: CanActivateFn = (route, state) => {
  const authFacade = inject(AuthFacade);

  if (authFacade.isAuthenticated()) {
    return true;
  }
  return createUrlTreeFromSnapshot(route, ['/login']);
};
