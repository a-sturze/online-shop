import { Routes } from '@angular/router';
import { ShoppingCartDetails } from './components/containers/shopping-cart-details/shopping-cart-details';
import { authGuard } from '../../guards/auth.guard';
import { roleGuard } from '../../guards/role.guard';
import { Role } from '../../enums/role';

export const shoppingCartRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ShoppingCartDetails,
    canActivate: [authGuard, roleGuard],
    data: { role: Role.Customer },
  },
];
