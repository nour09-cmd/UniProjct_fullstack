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

interface Item {
  name: string;
  price: number;
  category: string;
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
  items: Item[] = [
    { name: 'Reis', price: 15, category: 'Lebensmittel' },
    { name: 'Brot', price: 3, category: 'Lebensmittel' },
    { name: 'Milch', price: 2.5, category: 'Getränke' },
    { name: 'Cola', price: 1.5, category: 'Getränke' },
    { name: 'Butter', price: 5, category: 'Lebensmittel' },
  ];

  CategoryOptions = [
    { value: 'men', text: 'Männer' },
    { value: 'women', text: 'Frauen' },
    { value: 'Beard', text: 'Bart' },
    { value: 'waxing', text: 'Waxing' },
    { value: 'kids', text: 'Kinder' },
  ];

  radioOptions = [
    { label: 'Add List', value: 'addList' },
    { label: 'Show All', value: 'showAll' },
  ];

  selectedFilter: string = 'showAll';
  categories: any[] = [];
  priceListForm: FormGroup;
  @Input() categoryValue: string = 'Lebensmittel';

  constructor(private fb: FormBuilder) {
    this.priceListForm = this.fb.group({
      category: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: [
        '',
        [Validators.required, Validators.pattern('^\\d+(\\.\\d{1,2})?$')],
      ],
    });
  }
  ngOnInit(): void {}

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
  addItem(): void {
    if (this.priceListForm.valid) {
      const newItem: Item = this.priceListForm.value;
      this.items.push(newItem);
      console.log(this.items);
      alert(
        `Added Item: ${newItem.name}, Price: ${newItem.price} €, Category: ${newItem.category}`
      );
      this.priceListForm.reset();
    }
  }
  updateItem(item: Item): void {
    this.priceListForm.setValue({
      name: item.name,
      price: item.price,
      category: item.category,
    });

    this.items = this.items.filter((i) => i !== item);
  }
  deleteItem(item: Item): void {
    this.items = this.items.filter((i) => i !== item);
    console.log(this.items);
  }
}
