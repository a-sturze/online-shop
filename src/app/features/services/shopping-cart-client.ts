import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Order } from '../shared/order';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartClientService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = environment.apiUrl;

  checkout(order: Order) {
    return this.http.post(`${this.BASE_URL}/orderss`, order);
  }
}
