import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PagebennerComponent } from '../../Components/pagebenner/pagebenner.component';
import { TitleLineComponent } from '../../Components/title-line/title-line.component';
import { UnsereButtonComponent } from '../../Components/unsere-button/unsere-button.component';
import { getUserData, logIn } from '../../redux/features/User/UserSlice';
import { StoreService } from '../../redux/store.service';
import { TOKEN } from '../../utils/config';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    PagebennerComponent,
    UnsereButtonComponent,
    TitleLineComponent,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  userData: any;
  loading: boolean = true;
  loadingData: boolean = true;
  singUpErorr: any = [];
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  async checkLogin() {
    await this.storeService.subscribe(() => {
      const state = this.storeService.getState().user;
      if (state.userData?.email) {
        this.loadingData = false;
        this._router.navigate(['/']);
      }
    });
    await this.storeService.dispatch(getUserData());
  }
  async ngOnInit() {
    if (this.loadingData) this.checkLogin();
  }
  hide = true;
  async onSubmit() {
    if (this.loginForm.invalid) {
      this.handleError('Bitte füllen Sie alle Felder aus.');
      return;
    }

    try {
      await this.storeService.dispatch(logIn(this.loginForm.value));
      this.storeService.subscribe(() => {
        const state = this.storeService.getState().user;
        if (state.errors) {
          this.handleError(state.errors);
        } else if (state.userData?.role === 'barber') {
          this._router.navigate(['/dashboard/appointment']);
        } else {
          this._router.navigate(['/']);
        }
      });
    } catch (error) {
      this.handleError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  }

  private handleError(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar-error'],
    });
  }
}
