import { createReducer, on } from '@ngrx/store';
import {
  createProduct,
  createProductSuccess,
  editProduct,
  editProductSuccess,
  loadProductDetails,
  loadProductDetailsSuccess,
  loadProducts,
  loadProductsError,
  loadProductsSuccess,
} from './products.actions';
import { Product } from '../../types/products';
import { logout } from '../auth/auth.actions';

export interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  error: string | null;
  loading: boolean;
}
export const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  error: null,
  loading: false,
};

export const productsReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({ ...state, loading: true, error: null })),
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products: products,
    error: null,
    loading: false,
  })),
  on(loadProductsError, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(loadProductDetails, (state) => ({ ...state, loading: true, error: null })),
  on(loadProductDetailsSuccess, (state, { product }) => ({
    ...state,
    currentProduct: product,
    error: null,
    loading: false,
  })),
  on(createProduct, (state) => ({ ...state, loading: true, error: null })),
  on(createProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
    currentProduct: product,
    error: null,
    loading: false,
  })),
  on(editProduct, (state) => ({ ...state, loading: true, error: null })),
  on(editProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map((p) => (p.id === product.id ? product : p)),
    currentProduct: product,
    error: null,
    loading: false,
  })),
  on(logout, () => initialState)
);
