import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducers';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartProducts = createSelector(
  selectCartState,
  (state: CartState) => state.cartProducts
);

export const selectCartLoading = createSelector(
  selectCartState,
  (state: CartState) => state.loading
);

export const selectCartError = createSelector(selectCartState, (state: CartState) => state.error);
