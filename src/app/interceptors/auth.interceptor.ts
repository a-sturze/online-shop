import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthFacade } from '../state/auth/auth.facade';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authFacade = inject(AuthFacade);

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        authFacade.logout();
      }

      return throwError(() => error);
    })
  );
}
