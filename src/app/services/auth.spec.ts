import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  const apiUrl = 'http://localhost:3000/api/auth';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('login should be called with correct url', () => {
    const spy = spyOn(httpClient, 'post');
    const loginData = { username: 'test', password: 'test' };
    service.login(loginData);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/login`, loginData);
  });

  it('getUserProfile should be called with correct url and headers', () => {
    const spy = spyOn(httpClient, 'get');
    const token = 'test-token';
    service.getUserProfile(token);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });
});
