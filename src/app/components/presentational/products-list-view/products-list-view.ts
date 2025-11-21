import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../../types/products';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-list-view',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './products-list-view.html',
  styleUrl: './products-list-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListView {
  data = input.required<Product[]>();

  protected readonly displayedColumns = ['category', 'name', 'price', 'actions'];

  addToCart = () => {};
}
