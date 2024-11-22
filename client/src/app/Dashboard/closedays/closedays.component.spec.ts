import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedaysComponent } from './closedays.component';

describe('ClosedaysComponent', () => {
  let component: ClosedaysComponent;
  let fixture: ComponentFixture<ClosedaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClosedaysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClosedaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
