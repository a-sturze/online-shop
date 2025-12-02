import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ShoppingCartDetailsView } from '../../presentational/shopping-cart-details-view/shopping-cart-details-view';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';
import { Loader } from '../../../../../components/shared/loader/loader';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthFacade } from '../../../../../state/auth/auth.facade';
import { CartFacade } from '../../../../../state/cart/cart.facade';

@Component({
  selector: 'app-shopping-cart-details',
  imports: [ShoppingCartDetailsView, Loader],
  templateUrl: './shopping-cart-details.html',
  styleUrl: './shopping-cart-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartDetails {
  private readonly snackBar = inject(MatSnackBar);
  private readonly authFacade = inject(AuthFacade);
  protected readonly cartFacade = inject(CartFacade);

  constructor() {
    this.cartFacade.error$
      .pipe(
        takeUntilDestroyed(),
        filter((error) => !!error)
      )
      .subscribe(() => {
        this.snackBar.open('Could not load cart products', 'Close', { verticalPosition: 'top' });
      });
  }

  checkout() {
    const user = this.authFacade.user();
    if (!user) {
      return;
    }
    this.cartFacade.checkoutCart(user.id);
  }
}
