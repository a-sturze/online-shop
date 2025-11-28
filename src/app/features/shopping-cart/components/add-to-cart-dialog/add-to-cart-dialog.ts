import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  product: string;
}

@Component({
  selector: 'app-add-to-cart-dialog',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './add-to-cart-dialog.html',
  styleUrl: './add-to-cart-dialog.scss',
})
export class AddToCartDialog {
  private readonly dialogRef = inject(MatDialogRef<AddToCartDialog>);
  private readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  protected readonly product = model(this.data.product);
  protected readonly quantity = model<number>(1);

  handleCancel(): void {
    this.dialogRef.close();
  }

  add(): void {
    this.dialogRef.close(this.quantity());
  }
}
