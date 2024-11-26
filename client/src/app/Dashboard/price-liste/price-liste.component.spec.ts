import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListeComponent } from './price-liste.component';

describe('PriceListeComponent', () => {
  let component: PriceListeComponent;
  let fixture: ComponentFixture<PriceListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriceListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
