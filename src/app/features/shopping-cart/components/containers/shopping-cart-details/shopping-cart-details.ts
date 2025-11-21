import { ChangeDetectionStrategy, Component } from '@angular/core';
import { cartProducts } from '../../../../../mocks/cart';
import { ShoppingCartDetailsView } from '../../presentational/shopping-cart-details-view/shopping-cart-details-view';
import { CartProduct } from '../../../../shared/types/product';

@Component({
  selector: 'app-shopping-cart-details',
  imports: [ShoppingCartDetailsView],
  templateUrl: './shopping-cart-details.html',
  styleUrl: './shopping-cart-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartDetails {
  data: CartProduct[] = cartProducts;
}
