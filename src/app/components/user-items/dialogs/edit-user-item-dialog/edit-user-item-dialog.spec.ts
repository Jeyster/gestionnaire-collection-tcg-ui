import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserItemDialog } from './edit-user-item-dialog';

describe('EditUserItemDialog', () => {
  let component: EditUserItemDialog;
  let fixture: ComponentFixture<EditUserItemDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserItemDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserItemDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
