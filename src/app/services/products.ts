import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../types/products';
import { ProductsClientService } from './products-client';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly clientService = inject(ProductsClientService);
  public readonly products = signal<Product[] | null>(null);
  public readonly product = signal<Product | null>(null);
  public readonly hasError = signal<boolean>(false);

  public getProducts() {
    if (this.products()) {
      return;
    }
    this.clientService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.hasError.set(false);
      },
      error: () => this.hasError.set(true),
    });
  }

  getProductDetails(id: string) {
    this.clientService.getProductDetails(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.hasError.set(false);
      },
      error: () => this.hasError.set(true),
    });
  }

  deleteProduct(id: string) {
    return this.clientService.deleteProduct(id).pipe(
      tap({
        next: () => {
          this.product.set(null);
          this.hasError.set(false);
          const products = this.products();
          if (products) {
            this.products.set(products.filter((p) => p.id !== id));
          }
        },
        error: () => this.hasError.set(true),
      })
    );
  }
}
