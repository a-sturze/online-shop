import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartDetails } from './shopping-cart-details';

describe('ShoppingCartDetails', () => {
  let component: ShoppingCartDetails;
  let fixture: ComponentFixture<ShoppingCartDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
