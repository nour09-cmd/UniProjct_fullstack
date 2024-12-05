import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriseListPageComponent } from './prise-list-page.component';

describe('PriseListPageComponent', () => {
  let component: PriseListPageComponent;
  let fixture: ComponentFixture<PriseListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriseListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriseListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
