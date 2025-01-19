import { Component, Input, OnInit } from '@angular/core';
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
interface sales {
  name: string;
  price: Number;
}
interface Item {
  category: string;
  sales: sales[];
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
    ReactiveFormsModule,
    DropdownBtnComponent,
  ],
  templateUrl: './price-liste.component.html',
  styleUrls: ['./price-liste.component.css'], // Schreibweise korrigiert
})
export class PriceListeComponent implements OnInit {
  liste: any;
  items: Item[] = [];
  ngOnInit(): void {
    this.storeService.dispatch(getPriceLite());
    this.storeService.subcribe(() => {
      const stateLaden =
        this.storeService.getState().laden.priceListe.priceListe;
      this.items = stateLaden;
    });
  }
  CategoryOptions = [
    {
      value: 'men',
      text: 'Männer',
    },
    {
      value: 'women',
      text: 'Frauen',
    },
    {
      value: 'Beard',
      text: 'Bart',
    },
    {
      value: 'waxing',
      text: 'Waxing',
    },
    {
      value: 'kids',
      text: 'Kinder',
    },
  ];

  radioOptions = [
    { label: 'Add List', value: 'addList' },
    { label: 'Show All', value: 'showAll' },
  ];

  selectedFilter: string = 'showAll';
  categories: any[] = [];
  priceListForm: FormGroup;
  @Input() categoryValue: string = 'Lebensmittel';

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private snackBar: MatSnackBar
  ) {
    this.priceListForm = this.fb.group({
      category: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: [
        '',
        [Validators.required, Validators.pattern('^\\d+(\\.\\d{1,2})?$')],
      ],
    });
  }

  get groupedItems(): { [category: string]: Item[] } {
    return this.items.reduce((grouped, item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
      return grouped;
    }, {} as { [category: string]: Item[] });
  }

  onFilterChange(selected: string): void {
    this.selectedFilter = selected;
  }
  get filteredItems(): Item[] {
    if (!this.categoryValue) return this.items;
    return this.items.filter((item) => item.category === this.categoryValue);
  }
  async addItem() {
    if (this.priceListForm.valid) {
      const newItem: any = this.priceListForm.value;

      // Try to find the category and add the new sale item if it exists
      const categoryIndex = this.items.findIndex(
        (item) => item.category === newItem.category
      );

      if (categoryIndex !== -1) {
        // Clone the found category item and update the sales array
        const updatedItem = { ...this.items[categoryIndex] };
        updatedItem.sales = [
          ...updatedItem.sales,
          { name: newItem.name, price: newItem.price },
        ];

        // Update the items array with the modified category item
        this.items = [
          ...this.items.slice(0, categoryIndex), // Items before the updated category
          updatedItem, // Updated category with new sale
          ...this.items.slice(categoryIndex + 1), // Items after the updated category
        ];
      } else {
        this.items = [
          ...this.items,
          {
            category: newItem.category,
            sales: [{ name: newItem.name, price: newItem.price }],
          },
        ];
      }
      this.snackBar.open(
        'bild eingefügt sie muss auf save drück wenn sie spiechen wollen',
        'X',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar-sucssec'],
        }
      );
      console.log(this.items);
      this.priceListForm.reset();
    }
  }

  deleteItem(categoryIndex: number, sale: sales): void {
    if (categoryIndex >= 0 && categoryIndex < this.items.length) {
      const updatedSales = this.items[categoryIndex].sales.filter(
        (existingSale) => existingSale.name !== sale.name
      );
      if (updatedSales.length === 0) {
        this.items = this.items.filter((_, index) => index !== categoryIndex);
      } else {
        this.items = this.items.map((item, index) =>
          index === categoryIndex ? { ...item, sales: updatedSales } : item
        );
      }
    } else {
      console.error('Invalid index:', categoryIndex);
    }
    this.snackBar.open(
      'bild gelöscht sie muss auf save drück wenn sie spiechen wollen',
      'X',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar-werning'],
      }
    );
    console.log(this.items);
  }
  onSubmit() {
    this.storeService.dispatch(postPriceLite(this.items));
    location.reload();
  }
}
