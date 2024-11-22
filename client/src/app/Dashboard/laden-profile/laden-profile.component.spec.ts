import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadenProfileComponent } from './laden-profile.component';

describe('LadenProfileComponent', () => {
  let component: LadenProfileComponent;
  let fixture: ComponentFixture<LadenProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LadenProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LadenProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
