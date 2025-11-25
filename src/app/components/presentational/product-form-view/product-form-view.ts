import { Component, input, model, output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-product-form-view',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButton],
  templateUrl: './product-form-view.html',
  styleUrl: './product-form-view.scss',
})
export class ProductFormView {
  public readonly title = input.required<string>();
  public readonly form = model.required<FormGroup>();
  public readonly saveProduct = output();
  public readonly handleCancel = output();
}
