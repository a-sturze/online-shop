import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { LoginView } from '../../presentational/login-view/login-view';
import { FormGroup } from '@angular/forms';
import { createLoginForm } from '../../../utils/login.utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthFacade } from '../../../../../state/auth/auth.facade';

@Component({
  selector: 'app-login',
  imports: [LoginView],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly snackBar = inject(MatSnackBar);
  protected readonly loginForm: FormGroup = createLoginForm();
  private readonly authFacade = inject(AuthFacade);

  constructor() {
    effect(() => {
      if (this.authFacade.error()) {
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
    this.authFacade.login(this.loginForm.value);
  }
}
