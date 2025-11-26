import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject } from '@angular/core';
import { LoginView } from '../../presentational/login-view/login-view';
import { FormGroup } from '@angular/forms';
import { createLoginForm } from '../../../utils/login.utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth';

@Component({
  selector: 'app-login',
  imports: [LoginView],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly authService = inject(AuthService);
  protected readonly loginForm: FormGroup = createLoginForm();

  constructor() {
    effect(() => {
      if (this.authService.hasError()) {
        this.snackBar.open('Incorrect username or password', 'Close', { verticalPosition: 'top' });
      }
    });
  }

  login(): void {
    if (!this.loginForm.valid) {
      this.snackBar.open('The information entered is not correct', 'Close', {
        verticalPosition: 'top',
      });
      return;
    }
    this.authService
      .login(this.loginForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.router.navigate(['/products']);
      });
  }
}
