import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartDetailsView } from './shopping-cart-details-view';

describe('ShoppingCartDetailsView', () => {
  let component: ShoppingCartDetailsView;
  let fixture: ComponentFixture<ShoppingCartDetailsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartDetailsView],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartDetailsView);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', [
      {
        id: '1',
        name: 'Test Product 1',
        description: 'This is a test product 1',
        price: 50,
        imageUrl: 'http://example.com/image1.jpg',
        quantity: 2,
      },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
