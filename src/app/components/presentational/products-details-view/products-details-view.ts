import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../types/products';

@Component({
  selector: 'app-products-details-view',
  imports: [MatButtonModule],
  templateUrl: './products-details-view.html',
  styleUrl: './products-details-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetailsView {
  @Input({ required: true }) product!: Product;
}
