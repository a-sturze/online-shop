import { Routes } from '@angular/router';
import { ShoppingCartDetails } from './components/containers/shopping-cart-details/shopping-cart-details';

export const shoppingCartRoutes: Routes = [
  { path: '', pathMatch: 'full', component: ShoppingCartDetails },
];
