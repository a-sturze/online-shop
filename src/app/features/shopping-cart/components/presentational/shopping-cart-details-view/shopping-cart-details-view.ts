import { Component, Input } from '@angular/core';
import { Product } from '../../../../../types/products';

@Component({
  standalone: false,
  selector: 'app-shopping-cart-details-view',
  templateUrl: './shopping-cart-details-view.html',
  styleUrl: './shopping-cart-details-view.scss',
})
export class ShoppingCartDetailsView {
  @Input({ required: true })
  data: Product[] = [];

  protected displayedColumns = ['category', 'name', 'price', 'quantity', 'actions'];

  handleDelete = (id: string) => {
    console.log(id);
  };
}
