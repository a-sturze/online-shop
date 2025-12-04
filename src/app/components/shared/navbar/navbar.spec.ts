import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar } from './navbar';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

const mockStore = {
  select: (selector: any) => of('mockedValue'),
  dispatch: jasmine.createSpy('dispatch'),
};

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({}) } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
