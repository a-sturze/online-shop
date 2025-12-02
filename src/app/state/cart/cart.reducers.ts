import { createReducer, on } from '@ngrx/store';
import {
  addProductToCart,
  checkoutCart,
  checkoutCartError,
  checkoutCartSuccess,
  removeProductFromCart,
} from './cart.actions';
import { CartProduct } from '../../features/shared/types/product';
import { logout } from '../auth/auth.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

//using ngrx entity for the cart store
export interface CartState extends EntityState<CartProduct> {
  error: string | null;
  loading: boolean;
}

export function selectId(a: CartProduct): string {
  return a.id;
}

export function sortByName(a: CartProduct, b: CartProduct): number {
  return a.name.localeCompare(b.name);
}

export const adapter: EntityAdapter<CartProduct> = createEntityAdapter<CartProduct>({
  selectId: selectId,
  sortComparer: sortByName,
});

export const initialState: CartState = adapter.getInitialState({
  error: null,
  loading: false,
});

export const cartReducer = createReducer(
  initialState,
  on(addProductToCart, (state, product) => {
    const found = state.entities[product.id];
    if (!found) {
      return adapter.addOne(product, state);
    }
    return adapter.updateOne(
      { id: product.id, changes: { quantity: found.quantity + product.quantity } },
      state
    );
  }),
  on(removeProductFromCart, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(checkoutCart, (state) => ({ ...state, loading: true, error: null })),
  on(checkoutCartSuccess, () => initialState),
  on(checkoutCartError, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(logout, () => initialState)
);

const { selectAll } = adapter.getSelectors();

export const selectCartProducts = selectAll;
