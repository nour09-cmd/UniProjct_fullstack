import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedaysPageComponent } from './closedays-page.component';

describe('ClosedaysPageComponent', () => {
  let component: ClosedaysPageComponent;
  let fixture: ComponentFixture<ClosedaysPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClosedaysPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClosedaysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
