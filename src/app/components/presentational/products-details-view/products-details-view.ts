import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../types/products';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../delete-dialog/delete-dialog';

@Component({
  selector: 'app-products-details-view',
  imports: [MatButtonModule],
  templateUrl: './products-details-view.html',
  styleUrl: './products-details-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetailsView {
  public readonly product = input.required<Product>();
  public readonly deleteProduct = output<void>();

  readonly dialog = inject(MatDialog);

  openDialog(product: string): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '250px',
      data: { product: product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.deleteProduct.emit();
      }
    });
  }
}
