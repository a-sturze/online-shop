import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { cartProducts } from '../../../../../mocks/cart';
import { ShoppingCartDetailsView } from '../../presentational/shopping-cart-details-view/shopping-cart-details-view';
import { CartProduct } from '../../../../shared/types/product';
import { ShoppingCartService } from '../../../../services/shopping-cart';

@Component({
  selector: 'app-shopping-cart-details',
  imports: [ShoppingCartDetailsView],
  templateUrl: './shopping-cart-details.html',
  styleUrl: './shopping-cart-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartDetails {
  protected readonly data: CartProduct[] = cartProducts;
  private readonly cartService = inject(ShoppingCartService);

  checkout() {
    this.cartService.checkout().subscribe((data) => {});
  }
}
