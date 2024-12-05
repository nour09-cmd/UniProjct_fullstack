import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeiBarberPageComponent } from './sei-barber-page.component';

describe('SeiBarberPageComponent', () => {
  let component: SeiBarberPageComponent;
  let fixture: ComponentFixture<SeiBarberPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeiBarberPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeiBarberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
