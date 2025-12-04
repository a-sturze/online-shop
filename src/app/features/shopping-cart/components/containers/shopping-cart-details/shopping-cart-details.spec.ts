import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartDetails } from './shopping-cart-details';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

const mockStore = {
  select: (selector: any) => of('mockedValue'),
  dispatch: jasmine.createSpy('dispatch'),
};
describe('ShoppingCartDetails', () => {
  let component: ShoppingCartDetails;
  let fixture: ComponentFixture<ShoppingCartDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartDetails],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
