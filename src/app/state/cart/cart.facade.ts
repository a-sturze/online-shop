import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectCartError, selectCartLoading, selectCartProducts } from './cart.selectors';
import { addProductToCart, checkoutCart, removeProductFromCart } from './cart.actions';
import { CartProduct } from '../../features/shared/types/product';

@Injectable({ providedIn: 'root' })
export class CartFacade {
  private readonly store = inject(Store);

  public readonly error$ = this.store.select(selectCartError);
  public readonly isLoading = toSignal(this.store.select(selectCartLoading));
  public readonly cartProducts = toSignal(this.store.select(selectCartProducts), {
    initialValue: [],
  });

  public checkoutCart(userId: string): void {
    this.store.dispatch(
      checkoutCart({
        userId,
      })
    );
  }

  public removeProductFromCart(id: string): void {
    this.store.dispatch(
      removeProductFromCart({
        id,
      })
    );
  }

  public addProductToCart(product: CartProduct): void {
    this.store.dispatch(addProductToCart(product));
  }
}
