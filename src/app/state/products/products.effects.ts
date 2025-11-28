import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, switchMap, tap } from 'rxjs';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsError,
  loadProductDetails,
  loadProductDetailsSuccess,
  deleteProduct,
  deleteProductSuccess,
  createProduct,
  createProductSuccess,
  editProduct,
  editProductSuccess,
} from './products.actions';
import { ProductsService } from '../../services/products';
import { Router } from '@angular/router';

@Injectable()
export class ProductsEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);
  private readonly productsClient = inject(ProductsService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        this.productsClient.getProducts().pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError((error) => of(loadProductsError({ error: error.message })))
        )
      )
    )
  );

  loadProductDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductDetails),
      switchMap(({ productId }) =>
        this.productsClient.getProductDetails(productId).pipe(
          map((product) => loadProductDetailsSuccess({ product })),
          catchError((error) => of(loadProductsError({ error: error.message })))
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProduct),
      switchMap(({ product }) =>
        this.productsClient.createProduct(product).pipe(
          map((product) => createProductSuccess({ product })),
          catchError((error) => of(loadProductsError({ error: error.message })))
        )
      )
    )
  );

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createProductSuccess),
        tap(() => {
          this.router.navigate(['/products']);
        })
      ),
    { dispatch: false }
  );

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editProduct),
      switchMap(({ product }) =>
        this.productsClient.editProduct(product).pipe(
          map((product) => editProductSuccess({ product })),
          catchError((error) => of(loadProductsError({ error: error.message })))
        )
      )
    )
  );

  redirectAfterEdit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editProductSuccess),
        tap(({ product }) => {
          this.router.navigate([`/products/details/${product.id}`]);
        })
      ),
    { dispatch: false }
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      switchMap(({ productId }) =>
        this.productsClient.deleteProduct(productId).pipe(
          map(() => deleteProductSuccess()),
          catchError((error) => of(loadProductsError({ error: error.message })))
        )
      )
    )
  );

  redirectAfterDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteProductSuccess),
        tap(() => {
          this.router.navigate(['/products']);
        })
      ),
    { dispatch: false }
  );
}
