import { Routes } from '@angular/router';
import { ProductsList } from './components/containers/products-list/products-list';
import { ProductsDetails } from './components/containers/products-details/products-details';
import { ProductForm } from './components/containers/product-form/product-form';

export const routes: Routes = [
  { path: 'products', pathMatch: 'full', component: ProductsList },
  { path: 'products/add', component: ProductForm },
  { path: 'products/details/:id', component: ProductsDetails },
  { path: 'products/edit/:id', component: ProductForm },
  {
    path: 'cart',
    loadChildren: () =>
      import('./features/shopping-cart/shopping-cart-routes').then((m) => m.shoppingCartRoutes),
  },
  { path: '**', redirectTo: 'products' },
];
