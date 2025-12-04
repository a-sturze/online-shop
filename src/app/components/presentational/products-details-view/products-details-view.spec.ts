import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDetailsView } from './products-details-view';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ProductDetailsViewHarness } from './product-details-view.harness';
import { Component, Input } from '@angular/core';

@Component({
  template: `<app-products-details-view
    [product]="product"
    (openDialog)="openDialog($event)"
    [isAdmin]="isAdmin"
  />`,
  standalone: false,
})
class HostComponent {
  @Input() isAdmin = false;
  product = {
    id: 1,
    name: 'Test Product',
    category: 'Test Category',
    description: 'This is a test product',
    price: 99.99,
    imageUrl: 'http://example.com/image.jpg',
  };

  openDialog(productName: string): void {}
}

@Component({ template: '' })
class NoopComponent {}

describe('ProductsDetailsView', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let harness: ProductDetailsViewHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [
        ProductsDetailsView,
        RouterModule.forRoot([{ path: 'products/edit/:id', component: NoopComponent }]),
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map().set('id', '1') } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    const loader = TestbedHarnessEnvironment.loader(fixture);
    harness = await loader.getHarness(ProductDetailsViewHarness);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product name', async () => {
    expect(await harness.getProductName()).toBe('Test Product');
  });

  it('should display product title', async () => {
    expect(await harness.getProductTitle()).toBe('Product: Test Product');
  });

  it('should display product description', async () => {
    expect(await harness.getProductDescription()).toBe('This is a test product');
  });

  it('should display product category', async () => {
    expect(await harness.getProductCategory()).toBe('Test Category');
  });

  it('should display product price', async () => {
    expect(await harness.getProductPrice()).toBe('99.99 RON');
  });

  describe('editing', () => {
    it('should not be able to edit if not admin', async () => {
      component.isAdmin = false;
      fixture.detectChanges();

      expect(TestBed.inject(Router).url).toBe('/');
      await harness.edit();

      expect(TestBed.inject(Router).url).toBe('/');
    });

    it('should be able to edit if admin', async () => {
      component.isAdmin = true;
      fixture.detectChanges();

      expect(TestBed.inject(Router).url).toBe('/');
      await harness.edit();

      expect(TestBed.inject(Router).url).toBe('/products/edit/1');
    });

    describe('deleting', () => {
      it('should not be able to delete if not admin', async () => {
        component.isAdmin = false;
        fixture.detectChanges();
        const spy = spyOn(component, 'openDialog');

        await harness.delete();

        expect(spy).not.toHaveBeenCalled();
      });

      it('should be able to delete if admin', async () => {
        component.isAdmin = true;
        fixture.detectChanges();

        const spy = spyOn(component, 'openDialog');

        await harness.delete();

        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
