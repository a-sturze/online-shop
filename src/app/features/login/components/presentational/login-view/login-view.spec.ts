import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginView } from './login-view';
import { createLoginForm } from '../../../utils/login.utils';

describe('LoginView', () => {
  let component: LoginView;
  let fixture: ComponentFixture<LoginView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginView],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginView);
    component = fixture.componentInstance;
    const form = createLoginForm();
    fixture.componentRef.setInput('form', form);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
