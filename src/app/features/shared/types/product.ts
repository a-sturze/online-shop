import { Product } from '../../../types/products';

export interface CartProduct extends Product {
  quantity: number;
}
