import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDetails } from './products-details';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { Component, signal, WritableSignal } from '@angular/core';
import { ProductsFacade } from '../../../state/products/products.facade';
import { AuthFacade } from '../../../state/auth/auth.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ProductDetailsHarness } from './product-details.harness';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../../presentational/delete-dialog/delete-dialog';
import { deleteProduct } from '../../../state/products/products.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  template: `<app-products-details />`,
  standalone: false,
})
class HostComponent {}

const mockStore = {
  select: (selector: any) => of('mockedValue'),
  dispatch: jasmine.createSpy('dispatch'),
};
const mockProduct = {
  id: '1',
  name: 'Test Product',
  category: 'Test Category',
  description: 'This is a test product',
  price: 99.99,
  imageUrl: 'http://example.com/image.jpg',
};

describe('ProductsDetails', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let harness: ProductDetailsHarness;
  let isLoading$: BehaviorSubject<boolean>;
  let error$: BehaviorSubject<string | null>;
  let deleteDialogResult$: Subject<string | undefined>;
  let isAdmin: WritableSignal<boolean>;
  let loadProductDetailsSpy: jasmine.Spy;

  beforeEach(async () => {
    isLoading$ = new BehaviorSubject<boolean>(false);
    deleteDialogResult$ = new Subject<string | undefined>();
    error$ = new BehaviorSubject<string | null>(null);
    isAdmin = signal(false);
    loadProductDetailsSpy = jasmine.createSpy();

    await TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [ProductsDetails],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: Store, useValue: mockStore },
        {
          provide: ProductsFacade,
          useFactory: () => ({
            currentProduct: signal(mockProduct),
            error$: error$.asObservable(),
            isLoading: toSignal(isLoading$.asObservable()),
            loadProductDetails: loadProductDetailsSpy,
            deleteProduct: () => {},
          }),
        },
        {
          provide: AuthFacade,
          useFactory: () => ({
            isAdmin: isAdmin,
          }),
        },
        {
          provide: MatDialog,
          useFactory: () => ({
            open: () => ({ afterClosed: () => deleteDialogResult$.asObservable() }),
          }),
        },
        { provide: MatSnackBar, useFactory: () => ({ open: () => {} }) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    const loader = TestbedHarnessEnvironment.loader(fixture);
    harness = await loader.getHarness(ProductDetailsHarness);
  });

  afterEach(() => {
    isLoading$.complete();
    deleteDialogResult$.complete();
    error$.complete();
  });

  it('load product', () => {
    expect(loadProductDetailsSpy).toHaveBeenCalledTimes(1);
    expect(loadProductDetailsSpy).toHaveBeenCalledWith('1');
  });

  describe('loading', () => {
    it('should show loader while isLoading is true', async () => {
      isLoading$.next(true);
      expect(await harness.hasLoader()).toBeTruthy();
    });

    it('should not show loader while isLoading is false', async () => {
      isLoading$.next(false);
      expect(await harness.hasLoader()).toBeFalsy();
    });
  });

  describe('deleting', () => {
    let spy: jasmine.Spy;
    beforeEach(() => {
      const productsFacade = TestBed.inject(ProductsFacade);
      spy = spyOn(productsFacade, 'deleteProduct');
    });

    describe('non admin mode', () => {
      beforeEach(() => {
        isAdmin.set(false);
      });

      it('should delete the product after confirmation', async () => {
        await harness.deleteProduct();
        deleteDialogResult$.next('Test Product');

        expect(spy).not.toHaveBeenCalled();
      });

      it('should not delete the product if canceled', async () => {
        await harness.deleteProduct();
        deleteDialogResult$.next(undefined);

        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('admin mode', () => {
      beforeEach(() => {
        isAdmin.set(true);
      });

      it('should delete the product after confirmation', async () => {
        await harness.deleteProduct();
        deleteDialogResult$.next('Test Product');

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('1');
      });

      it('should not delete the product if canceled', async () => {
        await harness.deleteProduct();
        deleteDialogResult$.next(undefined);

        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

  it('should display error when it exists', () => {
    const snackBar = TestBed.inject(MatSnackBar);
    const spy = spyOn(snackBar, 'open');
    error$.next('Has error');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Could not load product', 'Close', jasmine.any(Object));

    error$.next(null);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should display correct product', async () => {
    expect(await harness.getProduct()).toBe('Test Product');
  });
});
