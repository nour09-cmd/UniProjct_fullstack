import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnmeldenRegisterComponent } from './anmelden-register.component';

describe('AnmeldenRegisterComponent', () => {
  let component: AnmeldenRegisterComponent;
  let fixture: ComponentFixture<AnmeldenRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnmeldenRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnmeldenRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
