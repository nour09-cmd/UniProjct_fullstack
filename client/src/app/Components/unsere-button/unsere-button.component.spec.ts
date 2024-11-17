import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsereButtonComponent } from './unsere-button.component';

describe('UnsereButtonComponent', () => {
  let component: UnsereButtonComponent;
  let fixture: ComponentFixture<UnsereButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsereButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsereButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
