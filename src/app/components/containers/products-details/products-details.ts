import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject } from '@angular/core';
import { ProductsDetailsView } from '../../presentational/products-details-view/products-details-view';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../../presentational/delete-dialog/delete-dialog';

@Component({
  selector: 'app-products-details',
  imports: [ProductsDetailsView],
  templateUrl: './products-details.html',
  styleUrl: './products-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly productService = inject(ProductsService);
  protected readonly productId = this.route.snapshot.paramMap.get('id') || '';
  private _snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);
  readonly dialog = inject(MatDialog);

  constructor() {
    effect(() => {
      if (this.productService.hasError()) {
        this._snackBar.open('Could not load product', 'Close', { verticalPosition: 'top' });
      }
    });
  }
  ngOnInit() {
    this.productService.getProductDetails(this.productId);
  }

  deleteProduct() {
    this.productService
      .deleteProduct(this.productId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.router.navigate(['/products']));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '250px',
      data: { product: this.productService.product()?.name || '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.deleteProduct();
      }
    });
  }
}
