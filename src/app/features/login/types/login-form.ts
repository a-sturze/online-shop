import { FormControl } from '@angular/forms';

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface LoginFormType {
  username: FormControl<string>;
  password: FormControl<string>;
}
