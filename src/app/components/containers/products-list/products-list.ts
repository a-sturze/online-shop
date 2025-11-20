import { Component } from '@angular/core';
import { products } from '../../../mocks/products';
import { ProductsListView } from '../../presentational/products-list-view/products-list-view';

@Component({
  selector: 'app-products-list',
  imports: [ProductsListView],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList {
  protected data = products;
}
