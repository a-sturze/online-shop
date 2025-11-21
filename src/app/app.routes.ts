import { Routes } from '@angular/router';
import { ProductsList } from './components/containers/products-list/products-list';
import { ProductsDetails } from './components/containers/products-details/products-details';

export const routes: Routes = [
  { path: 'products', pathMatch: 'full', component: ProductsList },
  { path: 'products/details/:id', component: ProductsDetails },
  {
    path: 'cart',
    loadComponent: () =>
      import(
        './features/shopping-cart/components/containers/shopping-cart-details/shopping-cart-details'
      ).then((m) => m.ShoppingCartDetails),
  },
  { path: '**', redirectTo: 'products' },
];
