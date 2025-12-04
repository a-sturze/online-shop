import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ProductsDetailsView } from '../../presentational/products-details-view/products-details-view';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../../presentational/delete-dialog/delete-dialog';
import { filter } from 'rxjs';
import { Loader } from '../../shared/loader/loader';
import { AuthFacade } from '../../../state/auth/auth.facade';
import { ProductsFacade } from '../../../state/products/products.facade';

@Component({
  selector: 'app-products-details',
  imports: [ProductsDetailsView, Loader],
  templateUrl: './products-details.html',
  styleUrl: './products-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);

  protected readonly productId = this.route.snapshot.paramMap.get('id') || '';
  protected readonly productsFacade = inject(ProductsFacade);
  protected readonly authFacade = inject(AuthFacade);

  constructor() {
    this.productsFacade.error$
      .pipe(
        takeUntilDestroyed(),
        filter((error) => !!error)
      )
      .subscribe(() =>
        this.snackBar.open('Could not load product', 'Close', { verticalPosition: 'top' })
      );
  }

  ngOnInit() {
    this.productsFacade.loadProductDetails(this.productId);
  }

  openDialog(productName: string): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '250px',
      data: { product: productName },
    });
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((result) => !!result)
      )
      .subscribe(() => {
        this.productsFacade.deleteProduct(this.productsFacade.currentProduct()?.id || '');
      });
  }
}
