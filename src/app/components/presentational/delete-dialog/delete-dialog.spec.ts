import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialog } from './delete-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

const matDialogRefStub = {
  close: jasmine.createSpy('close'),
  afterClosed: () => of('mock-result'),
};
describe('DeleteDialog', () => {
  let component: DeleteDialog;
  let fixture: ComponentFixture<DeleteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDialog],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { id: 123 } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
