import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RadioButtonComponent } from '../../Components/radio-button/radio-button.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DropdownBtnComponent } from '../../Components/dropdown-btn/dropdown-btn.component';
import { StoreService } from '../../redux/store.service';
import {
  getPriceLite,
  postPriceLite,
} from '../../redux/features/Laden/LadenSlice';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogAnimationsExampleDialog } from '../../Components/dialog-animations/dialog-animations-example-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

// Verbesserte Typdefinitionen
interface Dienstleistung {
  name: string;
  price: number;
  descriptions: string;
  img: string;
}

interface Kategorie {
  category: string;
  sales: Dienstleistung[];
}

@Component({
  selector: 'app-price-liste',
  standalone: true,
  imports: [
    RadioButtonComponent,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    DropdownBtnComponent,
  ],
  templateUrl: './price-liste.component.html',
  styleUrls: ['./price-liste.component.css'],
})
export class PriceListeComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);

  // State variables
  items: Kategorie[] = [];
  selectedFilter: string = 'showAll';
  isLoading: boolean = false;
  hasErrors: boolean = false;
  errorMessage: string = '';
  private destroy$ = new Subject<void>();

  // Form
  priceListForm: FormGroup = this.initializeForm();

  // Kategorieoptionen
  readonly CategoryOptions = [
    { value: 'men', text: 'Männer' },
    { value: 'women', text: 'Frauen' },
    { value: 'Beard', text: 'Bart' },
    { value: 'waxing', text: 'Waxing' },
    { value: 'kids', text: 'Kinder' },
    { value: 'haircut', text: 'Haarschnitt' },
    { value: 'coloring', text: 'Färben' },
    { value: 'highlights', text: 'Strähnen' },
    { value: 'blow_dry', text: 'Föhnen' },
    { value: 'styling', text: 'Styling' },
    { value: 'keratin_treatment', text: 'Keratinbehandlung' },
    { value: 'perm', text: 'Dauerwelle' },
    { value: 'shampoo', text: 'Shampoo' },
    { value: 'updo', text: 'Hochsteckfrisur' },
    { value: 'hair_extensions', text: 'Haarverlängerung' },
    { value: 'hair_trimming', text: 'Haarschnitt (Spitzen schneiden)' },
    { value: 'head_massage', text: 'Kopfmassage' },
    { value: 'bridal_hairstyle', text: 'Hochzeitsfrisur' },
  ];

  // Anzeigeoptionen
  readonly radioOptions = [
    { label: 'Preisliste Bearbeitung', value: 'addList' },
    { label: 'Listen anzeigen', value: 'showAll' },
  ];

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPriceList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): FormGroup {
    return this.fb.group({
      category: ['', [Validators.required]],
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      price: ['', [
        Validators.required,
        Validators.min(0),
        Validators.pattern('^\\d+(\\.\\d{1,2})?$')
      ]],
    });
  }

  private loadPriceList(): void {
    this.isLoading = true;
    this.hasErrors = false;

    try {
      this.storeService.dispatch(getPriceLite());

      // Create an observable from the store subscription
      const storeSubscription = () => {
        const state = this.storeService.getState();
        if (state.laden?.priceListe?.priceListe) {
          this.items = state.laden.priceListe.priceListe;
          this.isLoading = false;
        }
      };

      // Subscribe to store changes and automatically unsubscribe on component destroy
      this.storeService.subscribe(storeSubscription);

    } catch (error) {
      this.handleError('Fehler beim Laden der Preisliste');
    }
  }

  // Event Handler
  onFilterChange(selected: string): void {
    this.selectedFilter = selected;
    if (selected === 'addList') {
      this.priceListForm.reset();
    }
  }

  async addItem(): Promise<void> {
    if (this.priceListForm.invalid) {
      this.showValidationErrors();
      return;
    }

    try {
      const formValue = this.priceListForm.value;

      // Erstelle neue Dienstleistung mit Standardwerten
      const newService: Dienstleistung = {
        name: formValue.name.trim(),
        price: Number(formValue.price),
        descriptions: `${formValue.name} - Dienstleistung`,
        img: 'default-service.png'
      };

      const categoryIndex = this.items.findIndex(
        item => item.category === formValue.category
      );

      if (categoryIndex !== -1) {
        // Aktualisiere existierende Kategorie
        const updatedItem = { ...this.items[categoryIndex] };
        updatedItem.sales = [...updatedItem.sales, newService];

        this.items = [
          ...this.items.slice(0, categoryIndex),
          updatedItem,
          ...this.items.slice(categoryIndex + 1)
        ];
      } else {
        // Erstelle neue Kategorie
        this.items = [
          ...this.items,
          {
            category: formValue.category,
            sales: [newService]
          }
        ];
      }

      this.showSuccessMessage('Dienstleistung wurde erfolgreich hinzugefügt');
      this.priceListForm.reset();
    } catch (error) {
      this.handleError('Fehler beim Hinzufügen der Dienstleistung');
    }
  }

  deleteItem(categoryIndex: number, service: Dienstleistung): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '400px',
      data: {
        heading: 'Dienstleistung löschen',
        titel: `Möchten Sie "${service.name}" wirklich löschen?`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleItemDeletion(categoryIndex, service);
      }
    });
  }

  private handleItemDeletion(categoryIndex: number, service: Dienstleistung): void {
    try {
      if (categoryIndex >= 0 && categoryIndex < this.items.length) {
        const category = this.items[categoryIndex];
        const updatedSales = category.sales.filter(
          existingService => existingService.name !== service.name
        );

        if (updatedSales.length === 0) {
          // Entferne Kategorie wenn keine Dienstleistungen mehr vorhanden
          this.items = this.items.filter((_, index) => index !== categoryIndex);
        } else {
          // Aktualisiere Kategorie mit verbleibenden Dienstleistungen
          this.items = this.items.map((item, index) =>
            index === categoryIndex ? { ...item, sales: updatedSales } : item
          );
        }

        this.showWarningMessage('Dienstleistung wurde erfolgreich gelöscht');
      }
    } catch (error) {
      this.handleError('Fehler beim Löschen der Dienstleistung');
    }
  }

  onSubmit(): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '400px',
      data: {
        heading: 'Änderungen speichern',
        titel: 'Möchten Sie alle Änderungen speichern?'
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        try {
          this.isLoading = true;
          await this.storeService.dispatch(postPriceLite(this.items));
          this.showSuccessMessage('Änderungen wurden erfolgreich gespeichert');
          location.reload();        } catch (error) {
          this.handleError('Fehler beim Speichern der Änderungen');
        }
      }
    });
  }

  // Hilfsfunktionen
  private showValidationErrors(): void {
    const errors = [];
    const controls = this.priceListForm.controls;

    if (controls['category'].errors) {
      errors.push('Bitte wählen Sie eine Kategorie aus');
    }
    if (controls['name'].errors) {
      errors.push('Der Name muss zwischen 2 und 50 Zeichen lang sein');
    }
    if (controls['price'].errors) {
      errors.push('Bitte geben Sie einen gültigen Preis ein');
    }

    this.showErrorMessage(errors.join('\n'));
  }

  private handleError(message: string): void {
    this.isLoading = false;
    this.hasErrors = true;
    this.errorMessage = message;
    this.showErrorMessage(message);
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar-success']
    });
  }

  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar-warning']
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar-error']
    });
  }

  getTotalServicesCount(): number {
    return this.items.reduce((sum, category) => sum + category.sales.length, 0);
  }
}
