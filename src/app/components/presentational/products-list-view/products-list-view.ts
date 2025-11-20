import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  @Input({ required: true })
  data: Product[] = [];

  protected displayedColumns = ['category', 'name', 'price', 'actions'];
}
