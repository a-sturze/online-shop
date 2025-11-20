import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartDetails } from './components/containers/shopping-cart-details/shopping-cart-details';
import { ShoppingCartDetailsView } from './components/presentational/shopping-cart-details-view/shopping-cart-details-view';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { shoppingCartRoutes } from './shopping-cart-routes';

@NgModule({
  declarations: [ShoppingCartDetails, ShoppingCartDetailsView],
  imports: [
    CommonModule,
    RouterModule.forChild(shoppingCartRoutes),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ShoppingCartModule {}
