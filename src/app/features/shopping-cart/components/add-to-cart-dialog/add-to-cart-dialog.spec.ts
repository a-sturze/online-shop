import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartDialog } from './add-to-cart-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

const matDialogRefStub = {
  close: jasmine.createSpy('close'),
  afterClosed: () => of('mock-result'),
};

describe('AddToCartDialog', () => {
  let component: AddToCartDialog;
  let fixture: ComponentFixture<AddToCartDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToCartDialog],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { id: 123 } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddToCartDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
