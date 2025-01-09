import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WillkommenComponent } from './willkommen.component';
import { StoreService } from '../../redux/store.service';

describe('WillkommenComponent', () => {
  let component: WillkommenComponent;
  let fixture: ComponentFixture<WillkommenComponent>;
  let mockStoreService: any;

  beforeEach(async () => {
    // Mock des StoreService
    mockStoreService = {
      subcribe: jasmine
        .createSpy('subcribe')
        .and.callFake((callback: Function) => {
          callback(); // Simuliere einen Aufruf der Callback-Funktion
        }),
      getState: jasmine.createSpy('getState').and.returnValue({
        user: {
          userData: { name: 'Test User' },
          loading: false,
        },
      }),
      dispatch: jasmine.createSpy('dispatch'),
    };

    await TestBed.configureTestingModule({
      imports: [WillkommenComponent], // Nur WillkommenComponent importieren
      providers: [
        { provide: StoreService, useValue: mockStoreService }, // Mock-Service verwenden
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WillkommenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
