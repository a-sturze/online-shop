import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  selectAllProducts,
  selectCurrentProduct,
  selectProductsError,
  selectProductsLoading,
} from './products.selectors';
import {
  createProduct,
  deleteProduct,
  editProduct,
  loadProductDetails,
  loadProducts,
} from './products.actions';
import { Product } from '../../types/products';

@Injectable({ providedIn: 'root' })
export class ProductsFacade {
  private readonly store = inject(Store);

  public readonly error$ = this.store.select(selectProductsError);
  public readonly isLoading = toSignal(this.store.select(selectProductsLoading));
  public readonly allProducts = toSignal(this.store.select(selectAllProducts), {
    initialValue: [],
  });
  public readonly currentProduct = toSignal(this.store.select(selectCurrentProduct));

  public loadProducts(): void {
    this.store.dispatch(loadProducts());
  }

  public loadProductDetails(id: string): void {
    this.store.dispatch(loadProductDetails({ productId: id }));
  }

  public deleteProduct(id: string): void {
    this.store.dispatch(deleteProduct({ productId: id }));
  }

  public editProduct(product: Product): void {
    this.store.dispatch(editProduct({ product: product }));
  }

  public createProduct(product: Product): void {
    this.store.dispatch(createProduct({ product: product }));
  }
}
