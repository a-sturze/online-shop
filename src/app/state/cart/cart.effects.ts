import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { map, catchError, of, switchMap } from 'rxjs';
import { checkoutCart, checkoutCartError, checkoutCartSuccess } from './cart.actions';
import { ShoppingCartService } from '../../features/services/shopping-cart';
import { selectCartProducts } from './cart.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class CartEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly cartService = inject(ShoppingCartService);

  checkoutCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutCart),
      concatLatestFrom(() => this.store.select(selectCartProducts)),
      map(([{ userId }, products]) => ({
        customerId: userId,
        products: products.map((p) => ({ productId: p.id, quantity: p.quantity })) || [],
      })),
      switchMap((order) =>
        this.cartService.checkout(order).pipe(
          map(() => checkoutCartSuccess()),
          catchError((error) => of(checkoutCartError({ error: error.message })))
        )
      )
    )
  );
}
