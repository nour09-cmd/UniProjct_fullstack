import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApponitmentDashboardComponent } from './apponitment-dashboard.component';


describe('ApponitmentDashboardComponent', () => {
  let component: ApponitmentDashboardComponent;
  let fixture: ComponentFixture<ApponitmentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApponitmentDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApponitmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
