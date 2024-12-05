import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadenProfilePageComponent } from './laden-profile-page.component';

describe('LadenProfilePageComponent', () => {
  let component: LadenProfilePageComponent;
  let fixture: ComponentFixture<LadenProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LadenProfilePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LadenProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
