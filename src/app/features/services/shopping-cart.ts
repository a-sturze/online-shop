import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ShoppingCartClientService } from './shopping-cart-client';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly clientService = inject(ShoppingCartClientService);
  public readonly hasError = signal<boolean>(false);

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
    return this.clientService.checkout(order).subscribe({
      next: () => {
        this.hasError.set(false);
      },
      error: () => this.hasError.set(true),
    });
  }
}
