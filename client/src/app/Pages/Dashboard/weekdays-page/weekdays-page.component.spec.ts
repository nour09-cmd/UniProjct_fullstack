import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekdaysPageComponent } from './weekdays-page.component';

describe('WeekdaysPageComponent', () => {
  let component: WeekdaysPageComponent;
  let fixture: ComponentFixture<WeekdaysPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekdaysPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeekdaysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
