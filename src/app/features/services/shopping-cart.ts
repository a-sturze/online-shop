import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = environment.apiUrl;

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
    return this.http.post(`${this.BASE_URL}/orders`, order);
  }
}
