import { Routes } from '@angular/router';
import { ProductsList } from './components/containers/products-list/products-list';
import { ProductsDetails } from './components/containers/products-details/products-details';
import { ProductForm } from './components/containers/product-form/product-form';
import { Login } from './features/login/components/containers/login/login';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { Role } from './enums/role';

export const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: Login },
  { path: 'products', pathMatch: 'full', component: ProductsList, canActivate: [authGuard] },
  {
    path: 'products/add',
    component: ProductForm,
    canActivate: [authGuard, roleGuard],
    data: { role: Role.Admin },
  },
  { path: 'products/details/:id', component: ProductsDetails, canActivate: [authGuard] },
  {
    path: 'products/edit/:id',
    component: ProductForm,
    canActivate: [authGuard, roleGuard],
    data: { role: Role.Admin },
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./features/shopping-cart/shopping-cart-routes').then((m) => m.shoppingCartRoutes),
  },
  { path: '**', redirectTo: 'login' },
];
