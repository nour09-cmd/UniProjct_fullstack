import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresseInputComponent } from './addresse-input.component';

describe('AddresseInputComponent', () => {
  let component: AddresseInputComponent;
  let fixture: ComponentFixture<AddresseInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddresseInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddresseInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
