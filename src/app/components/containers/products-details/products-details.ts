import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsDetailsView } from '../../presentational/products-details-view/products-details-view';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products-details',
  imports: [ProductsDetailsView],
  templateUrl: './products-details.html',
  styleUrl: './products-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductsService);
  private readonly router = inject(Router);
  protected readonly productId = this.route.snapshot.paramMap.get('id') || '';

  protected readonly product = toSignal(this.productService.getProductDetails(this.productId));

  deleteProduct() {
    this.productService.deleteProduct(this.productId).subscribe((data) => {
      this.router.navigate(['/products']);
    });
  }
}
