import { Routes } from '@angular/router';
import { ProductsList } from './components/containers/products-list/products-list';
import { ProductsDetails } from './components/containers/products-details/products-details';

export const routes: Routes = [
  { path: 'products', pathMatch: 'full', component: ProductsList },
  { path: 'products/details/:id', component: ProductsDetails },
  {
    path: 'cart',
    loadChildren: () =>
      import('./features/shopping-cart/shopping-cart-routes').then((m) => m.shoppingCartRoutes),
  },
  { path: '**', redirectTo: 'products' },
];
