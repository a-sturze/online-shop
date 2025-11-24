import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/products';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsClientService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = environment.apiUrl;

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.BASE_URL + '/products');
  }

  getProductDetails(id: string): Observable<Product> {
    return this.http.get<Product>(this.BASE_URL + `/products/${id}`);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.BASE_URL + `/products/${id}`);
  }
}
