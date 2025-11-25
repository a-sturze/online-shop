import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ProductsListView } from '../../presentational/products-list-view/products-list-view';
import { ProductsService } from '../../../services/products';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-list',
  imports: [ProductsListView, FormsModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsList {
  protected readonly productService = inject(ProductsService);
  private snackBar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      if (this.productService.hasError()) {
        this.snackBar.open('Could not load products', 'Close', { verticalPosition: 'top' });
      }
    });
  }

  ngOnInit() {
    this.productService.getProducts();
  }
}
