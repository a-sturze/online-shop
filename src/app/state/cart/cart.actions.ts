import { createAction, props } from '@ngrx/store';
import { CartProduct } from '../../features/shared/types/product';

export const addProductToCart = createAction(
  '[Products Page] Add Product to Cart',
  props<CartProduct>()
);

export const removeProductFromCart = createAction(
  '[Cart Page] Remove Product from Cart',
  props<{ id: string }>()
);

export const checkoutCart = createAction('[Cart Page] Checkout Cart', props<{ userId: string }>());

export const checkoutCartSuccess = createAction('[Cart Page] Checkout Cart Success');

export const checkoutCartError = createAction(
  '[Cart Page] Checkout Cart Error',
  props<{ error: string }>()
);
