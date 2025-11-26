import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginFormValues, LoginFormType } from '../types/login-form';

const loginFormDefaults: LoginFormValues = {
  username: '',
  password: '',
};

export function createLoginForm(
  values: Partial<LoginFormValues> = loginFormDefaults
): FormGroup<LoginFormType> {
  return new FormGroup<LoginFormType>({
    username: new FormControl<string>(values.username || loginFormDefaults.username, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>(values.password || loginFormDefaults.password, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}
