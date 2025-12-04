import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

const mockStore = {
  select: (selector: any) => of('mockedValue'),
  dispatch: jasmine.createSpy('dispatch'),
};

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
