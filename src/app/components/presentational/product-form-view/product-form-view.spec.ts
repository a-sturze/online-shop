import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormView } from './product-form-view';
import { createProductForm } from '../../containers/product-form/utils/product-form.utils';

describe('ProductFormView', () => {
  let component: ProductFormView;
  let fixture: ComponentFixture<ProductFormView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormView],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormView);
    component = fixture.componentInstance;
    const form = createProductForm();
    fixture.componentRef.setInput('form', form);
    fixture.componentRef.setInput('title', 'title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
