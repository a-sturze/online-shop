import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductForm } from './product-form';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

const mockStore = {
  select: (selector: any) => of('mockedValue'),
  dispatch: jasmine.createSpy('dispatch'),
};

const activatedRouteStub = {
  snapshot: {
    paramMap: convertToParamMap({ id: '123' }),
    queryParams: { q: 'search' },
    data: { someData: 'value' },
  },
  params: of({ id: '123' }),
  queryParams: of({ q: 'search' }),
  data: of({ someData: 'value' }),
  paramMap: of(convertToParamMap({ id: '123' })),
};

describe('ProductForm', () => {
  let component: ProductForm;
  let fixture: ComponentFixture<ProductForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductForm],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Store, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
