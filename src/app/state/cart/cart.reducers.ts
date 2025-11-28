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

export interface CartState {
  cartProducts: CartProduct[];
  error: string | null;
  loading: boolean;
}
export const initialState: CartState = {
  cartProducts: [],
  error: null,
  loading: false,
};

export const cartReducer = createReducer(
  initialState,
  on(addProductToCart, (state, product) => {
    const found = state.cartProducts.find((p) => p.id === product.id);
    if (!found) return { ...state, cartProducts: [...state.cartProducts, product] };
    return {
      ...state,
      cartProducts: state.cartProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p
      ),
    };
  }),
  on(removeProductFromCart, (state, { id }) => ({
    ...state,
    cartProducts: state.cartProducts.filter((p) => p.id !== id),
  })),
  on(checkoutCart, (state) => ({ ...state, loading: true, error: null })),
  on(checkoutCartSuccess, (state) => ({ ...state, cartProducts: [], loading: false })),
  on(checkoutCartError, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(logout, () => initialState)
);
