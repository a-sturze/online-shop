import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/products';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = `${environment.apiUrl}/products`;

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.BASE_URL);
  }

  public getProductDetails(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}/${id}`);
  }

  public editProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.BASE_URL}/${product.id}`, product);
  }

  public createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.BASE_URL, product);
  }

  public deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
