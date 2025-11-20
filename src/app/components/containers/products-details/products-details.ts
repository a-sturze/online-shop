import { Component, Input } from '@angular/core';
import { ProductsDetailsView } from '../../presentational/products-details-view/products-details-view';
import { product } from '../../../mocks/products';

@Component({
  selector: 'app-products-details',
  imports: [ProductsDetailsView],
  templateUrl: './products-details.html',
  styleUrl: './products-details.scss',
})
export class ProductsDetails {
  product = product;
}
