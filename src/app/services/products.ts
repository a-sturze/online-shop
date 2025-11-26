import { inject, Injectable, Signal, signal } from '@angular/core';
import { Product } from '../types/products';
import { ProductsClientService } from './products-client';
import { Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly clientService = inject(ProductsClientService);
  private readonly _products = signal<Product[]>([]);
  private readonly _product = signal<Product | null>(null);
  private readonly _hasError = signal<boolean>(false);

  public get products(): Signal<Product[]> {
    return this._products.asReadonly();
  }

  public get product(): Signal<Product | null> {
    return this._product.asReadonly();
  }

  public get hasError(): Signal<boolean> {
    return this._hasError.asReadonly();
  }

  public getProducts(): void {
    this.clientService
      .getProducts()
      .pipe(take(1))
      .subscribe({
        next: (products) => {
          this._products.set(products);
          this._hasError.set(false);
        },
        error: () => this._hasError.set(true),
      });
  }

  public getProductDetails(id: string): void {
    this.clientService
      .getProductDetails(id)
      .pipe(take(1))
      .subscribe({
        next: (product) => {
          this._product.set(product);
          this._hasError.set(false);
        },
        error: () => this._hasError.set(true),
      });
  }

  public editProduct(product: Product): Observable<Product> {
    return this.clientService.editProduct(product).pipe(
      tap({
        next: () => {
          this._product.set(product);
          this._hasError.set(false);
          const products = this._products();
          if (products) {
            this._products.set(products.map((p) => (p.id === product.id ? product : p)));
          }
        },
        error: () => this._hasError.set(true),
      })
    );
  }

  public createProduct(product: Product): Observable<Product> {
    return this.clientService.createProduct(product).pipe(
      tap({
        next: (reponse: Product) => {
          this._product.set(reponse);
          this._hasError.set(false);
          const products = this._products();
          if (products) {
            this._products.update((current) => [...current, reponse]);
          }
        },
        error: () => this._hasError.set(true),
      })
    );
  }

  public deleteProduct(id: string): Observable<void> {
    return this.clientService.deleteProduct(id).pipe(
      tap({
        next: () => {
          this._product.set(null);
          this._hasError.set(false);
          const products = this._products();
          if (products) {
            this._products.set(products.filter((p) => p.id !== id));
          }
        },
        error: () => this._hasError.set(true),
      })
    );
  }
}
