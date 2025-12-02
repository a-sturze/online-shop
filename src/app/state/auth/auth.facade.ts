import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
  selectUser,
} from './auth.selectors';
import { getUserProfile, login, logout } from './auth.actions';
import { filter, Observable, take } from 'rxjs';
import { Role } from '../../enums/role';
import { User } from '../../types/users';
import { LoginFormValues } from '../../features/login/types/login-form';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);
  public readonly isAuthenticated = toSignal(this.store.select(selectIsAuthenticated), {
    initialValue: false,
  });

  public readonly error = toSignal(this.store.select(selectAuthError));
  public readonly user = toSignal(this.store.select(selectUser));
  public readonly isAdmin = computed(() => this.checkUserRole(this.user(), Role.Admin));
  public readonly isCustomer = computed(() => this.checkUserRole(this.user(), Role.Customer));

  public hasRole(role: Role): boolean {
    return this.checkUserRole(this.user(), role);
  }

  public logout(): void {
    this.store.dispatch(logout());
  }

  public login(loginData: LoginFormValues): void {
    this.store.dispatch(login(loginData));
  }

  init(): Observable<boolean> {
    this.store.dispatch(getUserProfile());

    return this.store.select(selectAuthLoading).pipe(
      filter((loading) => !loading),
      take(1)
    );
  }

  private readonly checkUserRole = (user: User | null | undefined, role: Role): boolean => {
    if (!user) {
      return false;
    }
    return user.roles.includes(role);
  };
}
