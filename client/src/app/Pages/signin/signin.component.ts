import { Component, Input, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PagebennerComponent } from '../../Components/pagebenner/pagebenner.component';
import { TitleLineComponent } from '../../Components/title-line/title-line.component';
import { logIn } from '../../redux/features/User/UserSlice';
import { StoreService } from '../../redux/store.service';
import { OurBtnBlackComponent } from "../../Components/our-btn-black/our-btn-black.component";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    PagebennerComponent,
    TitleLineComponent,
    ReactiveFormsModule,
    CommonModule,
    OurBtnBlackComponent
],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  userData: any;
  loading: boolean = true;

  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private _router: Router
  ) {
    // const token = localStorage.getItem('token') || '';

    // if (token || token != '') {
    //   this._router.navigate(['/']);
    // }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  @Input() title: string = 'create neu password';
  @Input() discription: string = 'discover amazing thing near around you';
  hide = true;
  async onSubmit() {
    if (this.loginForm.value) {
      const userData = this.loginForm.value;
      await this.storeService.dispatch(logIn(userData));
      this._router.navigate(['/']);
    }
  }
}
