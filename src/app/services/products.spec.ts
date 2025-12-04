import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Product } from '../types/products';
describe('ProductsService', () => {
  let service: ProductsService;
  let httpClient: HttpClient;
  const apiUrl = 'http://localhost:3000/api/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductsService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('getProducts should be called with correct url', () => {
    const spy = spyOn(httpClient, 'get');
    service.getProducts();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(apiUrl);
  });

  it('getProductDetails should be called with correct url', () => {
    const spy = spyOn(httpClient, 'get');
    const productId = '123';
    service.getProductDetails(productId);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/${productId}`);
  });

  it('editProduct should be called with correct url', () => {
    const spy = spyOn(httpClient, 'put');
    const product: Product = {
      id: '123',
      name: 'Test',
      category: 'Test',
      description: 'Test desc',
      price: 10,
      image: '',
    };
    service.editProduct(product);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/${product.id}`, product);
  });

  it('createProduct should be called with correct url', () => {
    const spy = spyOn(httpClient, 'post');
    const product: Product = {
      id: '123',
      name: 'Test',
      category: 'Test',
      description: 'Test desc',
      price: 10,
      image: '',
    };
    service.createProduct(product);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(apiUrl, product);
  });

  it('deleteProduct should be called with correct url', () => {
    const spy = spyOn(httpClient, 'delete');
    const productId = '123';
    service.deleteProduct(productId);
    service.deleteProduct(productId);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/${productId}`);
  });
});
