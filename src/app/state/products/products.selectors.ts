import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducers';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error
);

export const selectCurrentProduct = createSelector(
  selectProductsState,
  (state: ProductsState) => state.currentProduct
);
