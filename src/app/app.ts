import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsList } from './components/containers/products-list/products-list';
import { ProductsDetails } from './components/containers/products-details/products-details';
import { ShoppingCartModule } from './features/shopping-cart/shopping-cart-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductsList, ProductsDetails, ShoppingCartModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('online-shop');
}
