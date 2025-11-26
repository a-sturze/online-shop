import { ChangeDetectionStrategy, Component, model, output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login-view',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButton],
  templateUrl: './login-view.html',
  styleUrl: './login-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginView {
  public readonly form = model.required<FormGroup>();
  public readonly login = output();
}
