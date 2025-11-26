import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ProductsListView } from '../../presentational/products-list-view/products-list-view';
import { ProductsService } from '../../../services/products';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../../../enums/role';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-products-list',
  imports: [ProductsListView, FormsModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsList {
  private snackBar = inject(MatSnackBar);
  protected readonly authService = inject(AuthService);
  protected readonly productService = inject(ProductsService);

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
