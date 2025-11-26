import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../types/products';
import { RouterLink } from '@angular/router';
import { User } from '../../../types/users';

@Component({
  selector: 'app-products-details-view',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './products-details-view.html',
  styleUrl: './products-details-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetailsView {
  public readonly product = input.required<Product>();
  public readonly isAdmin = input.required<boolean>();
  public readonly openDialog = output<void>();
}
