import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurBtnGoldComponent } from './our-btn-gold.component';

describe('OurBtnGoldComponent', () => {
  let component: OurBtnGoldComponent;
  let fixture: ComponentFixture<OurBtnGoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurBtnGoldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurBtnGoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
