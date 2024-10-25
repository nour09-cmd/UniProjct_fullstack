import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurBTNComponent } from './our-btn.component';

describe('OurBTNComponent', () => {
  let component: OurBTNComponent;
  let fixture: ComponentFixture<OurBTNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurBTNComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurBTNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
