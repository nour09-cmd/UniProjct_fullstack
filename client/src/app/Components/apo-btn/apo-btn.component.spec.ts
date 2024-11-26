import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoBtnComponent } from './apo-btn.component';

describe('ApoBtnComponent', () => {
  let component: ApoBtnComponent;
  let fixture: ComponentFixture<ApoBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApoBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApoBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
