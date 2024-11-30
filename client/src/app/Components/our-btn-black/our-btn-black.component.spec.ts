import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurBtnBlackComponent } from './our-btn-black.component';

describe('OurBtnBlackComponent', () => {
  let component: OurBtnBlackComponent;
  let fixture: ComponentFixture<OurBtnBlackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurBtnBlackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurBtnBlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
