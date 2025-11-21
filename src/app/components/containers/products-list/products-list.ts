import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ProductsListView } from '../../presentational/products-list-view/products-list-view';
import { ProductsService } from '../../../services/products';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products-list',
  imports: [ProductsListView],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsList {
  private readonly productService = inject(ProductsService);
  protected readonly data = toSignal(this.productService.getProducts(), { initialValue: [] });
}
