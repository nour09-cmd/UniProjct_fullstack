import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagebennerComponent } from './pagebenner.component';

describe('PagebennerComponent', () => {
  let component: PagebennerComponent;
  let fixture: ComponentFixture<PagebennerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagebennerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagebennerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
