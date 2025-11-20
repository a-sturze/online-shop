import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-products-details-view',
  imports: [MatButtonModule],
  templateUrl: './products-details-view.html',
  styleUrl: './products-details-view.scss',
})
export class ProductsDetailsView {
  @Input({ required: true })
  product: any;
}
