import { inject, Injectable, Signal, signal } from '@angular/core';
import { ShoppingCartClientService } from './shopping-cart-client';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly clientService = inject(ShoppingCartClientService);
  private readonly _hasError = signal<boolean>(false);

  public get hasError(): Signal<boolean> {
    return this._hasError.asReadonly();
  }
  checkout() {
    const order = {
      customerId: 'de96921d-2f8d-46e7-8061-31468180de96',
      products: [
        {
          productId: 'caf385cd-4b16-49dd-ae35-e1fa5b02c412',
          quantity: 3,
        },
      ],
    };
    return this.clientService
      .checkout(order)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._hasError.set(false);
        },
        error: () => this._hasError.set(true),
      });
  }
}
