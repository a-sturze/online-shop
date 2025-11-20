import { Routes } from '@angular/router';
import { ProductsList } from './components/containers/products-list/products-list';
import { ProductsDetails } from './components/containers/products-details/products-details';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: ProductsList },
  { path: 'details/:id', component: ProductsDetails },
  {
    path: 'cart',
    loadChildren: () =>
      import('./features/shopping-cart/shopping-cart-module').then((m) => m.ShoppingCartModule),
  },
  { path: '**', redirectTo: '' },
];
