import { Component, OnInit } from '@angular/core';
import { AddresseInputComponent } from '../../Components/addresse-input/addresse-input.component';
import { CommonModule } from '@angular/common';
import {
  FormArray,
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
import { UnsereButtonComponent } from '../../Components/unsere-button/unsere-button.component';
import { StoreService } from '../../redux/store.service';
import { Router } from '@angular/router';
import {
  getOneLaden,
  updateLaden,
} from '../../redux/features/Laden/LadenSlice';
import { getUserData } from '../../redux/features/User/UserSlice';
import { WillkommenComponent } from '../../Components/willkommen/willkommen.component';

@Component({
  selector: 'app-laden-profile',
  standalone: true,
  imports: [
    WillkommenComponent,
    UnsereButtonComponent,
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
    CommonModule,
  ],
  templateUrl: './laden-profile.component.html',
  styleUrl: './laden-profile.component.css',
})
export class LadenProfileComponent implements OnInit {
  _ladenDate: any = [];
  _userData: any = [];
  counter: boolean = false;
  async getUserData() {
    await this.storeService.subcribe(async () => {
      const stateUser = await this.storeService.getState().user;
      if (stateUser.userData.email != undefined && this.counter != true) {
        await this.getLadenData(stateUser.userData.email);
        this.counter = true;
      }
    });
  }
  getLadenData = async (email: any) => {
    await this.storeService.dispatch(getOneLaden({ email }));
    this.storeService.subcribe(() => {
      const state = this.storeService.getState().laden;
      this._ladenDate = state.getOneLaden;
      if (this._ladenDate?.Laden_name)
        this.initializeProfileData(state.getOneLaden);
    });
  };
  addressForm: FormGroup;
  initializeProfileData(laden: any) {
    console.log(laden);

    const teile = laden.Laden_adress.strasse.split(' ');
    const hausnumer = teile.pop();
    const strasse = teile.join(' ').trim();
    this.addressForm.patchValue({
      Laden_name: laden.Laden_name,
      Laden_description: laden.Laden_description,
      street: strasse || '',
      houseNumber: hausnumer,
      postalCode: laden.Laden_adress.plz || '',
      city: laden.Laden_adress.ort || '',
      uploadedFiles: laden.Laden_IMG,
    });
  }
  ngOnInit(): void {
    if (!this.counter) {
      this.getUserData();
    }
  }
  uploadedFiles: File[] = [];
  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private _router: Router
  ) {
    this.addressForm = this.fb.group({
      Laden_name: ['', Validators.required],
      Laden_description: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      city: ['', Validators.required],
      uploadedFiles: this.fb.array(
        [],
        [Validators.required, Validators.maxLength(3)]
      ),
    });
  }
  get uploadedFilesArray(): FormArray {
    return this.addressForm.get('uploadedFiles') as FormArray;
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validate file type: Only allow images
      if (!file.type.startsWith('image/')) {
        console.error('Bitte nur Bilddateien auswählen!');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        this.uploadedFilesArray.push(this.fb.control(base64String));
      };
      reader.readAsDataURL(file);
      console.log('Ausgewählte Datei:', file.name);
    }
  }

  removeFile(index: number): void {
    this.uploadedFilesArray.removeAt(index);
  }

  isUploadDisabled(): boolean {
    return this.uploadedFilesArray.length >= 3;
  }

  async onSubmit() {
    if (!this.addressForm.value) {
      return;
    }
    const data = {
      Laden_name: this.addressForm.value.Laden_name || '',
      Laden_description: this.addressForm.value.Laden_description || '',
      Laden_IMG: this.addressForm.value.uploadedFiles || [],
      Laden_adress: {
        strasse:
          this.addressForm.value.street +
            ' ' +
            this.addressForm.value.houseNumber || '',
        ort: this.addressForm.value.city || '',
        plz: this.addressForm.value.postalCode || '',
      },
    };
    await this.storeService.dispatch(updateLaden(data));

    location.reload();
  }
}
