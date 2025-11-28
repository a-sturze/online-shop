import { createAction, props } from '@ngrx/store';
import { Product } from '../../types/products';

export const loadProducts = createAction('[Products Page] Load Products');

export const loadProductsSuccess = createAction(
  '[Products Page] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsError = createAction(
  '[Products Page] Load Products Error',
  props<{ error: string }>()
);

export const loadProductDetails = createAction(
  '[Product Details Page] Load Product Details',
  props<{ productId: string }>()
);

export const loadProductDetailsSuccess = createAction(
  '[Product Details Page] Load Product Details Success',
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  '[Product Details Page] Delete Product',
  props<{ productId: string }>()
);

export const deleteProductSuccess = createAction('[Product Details Page] Delete Product Success');

export const createProduct = createAction(
  '[Product Details Page] Create Product',
  props<{ product: Product }>()
);

export const createProductSuccess = createAction(
  '[Product Details Page] Create Product Success',
  props<{ product: Product }>()
);

export const editProduct = createAction(
  '[Product Details Page] Edit Product',
  props<{ product: Product }>()
);

export const editProductSuccess = createAction(
  '[Product Details Page] Edit Product Success',
  props<{ product: Product }>()
);
