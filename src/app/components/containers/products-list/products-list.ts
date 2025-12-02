import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ProductsListView } from '../../presentational/products-list-view/products-list-view';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../types/products';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { AddToCartDialog } from '../../../features/shopping-cart/components/add-to-cart-dialog/add-to-cart-dialog';
import { Loader } from '../../shared/loader/loader';
import { filter } from 'rxjs';
import { AuthFacade } from '../../../state/auth/auth.facade';
import { ProductsFacade } from '../../../state/products/products.facade';
import { CartFacade } from '../../../state/cart/cart.facade';

@Component({
  selector: 'app-products-list',
  imports: [ProductsListView, FormsModule, Loader],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsList {
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);
  protected readonly authFacade = inject(AuthFacade);
  protected readonly productsFacade = inject(ProductsFacade);
  private readonly cartFacade = inject(CartFacade);

  constructor() {
    this.productsFacade.error$
      .pipe(
        takeUntilDestroyed(),
        filter((error) => !!error)
      )
      .subscribe(() =>
        this.snackBar.open('Could not load products', 'Close', { verticalPosition: 'top' })
      );
  }

  ngOnInit() {
    this.productsFacade.loadProducts();
  }

  addToCart(product: Product) {
    const dialogRef = this.dialog.open(AddToCartDialog, {
      width: '250px',
      data: { product: product.name },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result !== undefined) {
          this.cartFacade.addProductToCart({ ...product, quantity: result });
        }
      });
  }
}
