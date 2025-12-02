import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Order } from '../shared/types/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = environment.apiUrl;

  public checkout(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.BASE_URL}/orders`, order);
  }
}
