import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
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
  public readonly data = input.required<Product[]>();
  public readonly isAdmin = input.required<boolean>();
  public readonly isCustomer = input.required<boolean>();
  public readonly addToCart = output<Product>();

  protected readonly displayedColumns = ['category', 'name', 'price', 'actions'];
}
