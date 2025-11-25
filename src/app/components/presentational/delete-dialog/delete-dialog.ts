import { ChangeDetectionStrategy, Component, effect, inject, input, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface DialogData {
  product: string;
}

@Component({
  selector: 'app-delete-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialog {
  private readonly dialogRef = inject(MatDialogRef<DeleteDialog>);
  private readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  protected readonly product = model(this.data.product);

  handleCancel(): void {
    this.dialogRef.close();
  }
}
