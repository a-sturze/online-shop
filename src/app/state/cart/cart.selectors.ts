import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCart from './cart.reducers';

export const selectCartState = createFeatureSelector<fromCart.CartState>('cart');

export const selectCartProducts = createSelector(selectCartState, fromCart.selectCartProducts);

export const selectCartLoading = createSelector(
  selectCartState,
  (state: fromCart.CartState) => state.loading
);

export const selectCartError = createSelector(
  selectCartState,
  (state: fromCart.CartState) => state.error
);
