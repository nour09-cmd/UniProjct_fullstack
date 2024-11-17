import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownBtnComponent } from './dropdown-btn.component';

describe('DropdownBtnComponent', () => {
  let component: DropdownBtnComponent;
  let fixture: ComponentFixture<DropdownBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
