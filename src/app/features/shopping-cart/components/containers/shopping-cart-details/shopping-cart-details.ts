import { Component } from '@angular/core';
import { cartProducts } from '../../../../../mocks/cart';

@Component({
  standalone: false,
  selector: 'app-shopping-cart-details',
  templateUrl: './shopping-cart-details.html',
  styleUrl: './shopping-cart-details.scss',
})
export class ShoppingCartDetails {
  data = cartProducts;
}
