import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsDetailsView } from '../../presentational/products-details-view/products-details-view';
import { product } from '../../../mocks/products';
import { Product } from '../../../types/products';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-details',
  imports: [ProductsDetailsView],
  templateUrl: './products-details.html',
  styleUrl: './products-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetails {
  route = inject(ActivatedRoute);

  protected readonly product: Product = product;

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
  }
}
