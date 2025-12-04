import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListView } from './products-list-view';
import { ActivatedRoute } from '@angular/router';

describe('ProductsListView', () => {
  let component: ProductsListView;
  let fixture: ComponentFixture<ProductsListView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsListView],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListView);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', []);
    fixture.componentRef.setInput('isAdmin', false);
    fixture.componentRef.setInput('isCustomer', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
