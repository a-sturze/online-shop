import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../../../../../types/products';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-shopping-cart-details-view',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './shopping-cart-details-view.html',
  styleUrl: './shopping-cart-details-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartDetailsView {
  data = input.required<Product[]>();
  checkout = output<void>();

  protected readonly displayedColumns = ['category', 'name', 'price', 'quantity', 'actions'];

  handleDelete = (id: string) => {
    console.log(id);
  };
}
