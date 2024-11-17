import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-apponitment-dashboard',
  standalone: true,
  imports: [ MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    CommonModule,],
  templateUrl: './apponitment-dashboard.component.html',
  styleUrl: './apponitment-dashboard.component.css'
})
export class ApponitmentDashboardComponent {
searchForm: FormGroup;
selectedDate: Date | null = null;
constructor(
  private fb: FormBuilder,
) {
  this.searchForm = this.fb.group({
    date: ['', [Validators.required, Validators.minLength(6)]],
  });
}

async onDateChange(event: any){
  if (this.searchForm.valid) {
    const date= this.searchForm.value;
    this.selectedDate = event.value;
    console.log(date);
  }
}

}
