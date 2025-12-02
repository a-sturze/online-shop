import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { cartReducer } from './state/cart/cart.reducers';
import { ProductsEffects } from './state/products/products.effects';
import { productsReducer } from './state/products/products.reducers';
import { CartEffects } from './state/cart/cart.effects';
import { AuthEffects } from './state/auth/auth.effects';
import { authReducer } from './state/auth/auth.reducers';
import { AuthFacade } from './state/auth/auth.facade';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAppInitializer(() => inject(AuthFacade).init()),
    provideStore({ auth: authReducer, cart: cartReducer, products: productsReducer }),
    provideEffects([CartEffects, ProductsEffects, AuthEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(),
  ],
};
