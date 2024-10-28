import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagebennerComponent } from './pagebenner/pagebenner.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { WillkommenComponent } from './willkommen/willkommen.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { AnmeldenRegisterComponent } from './anmelden-register/anmelden-register.component';



export const routes: Routes = [
  { path: '', component: WillkommenComponent },
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'pagebenner', component: PagebennerComponent },
  { path: 'rest', component: ResetPasswordComponent },
  { path: 'changepass', component: ChangePassComponent },
  { path: 'anmelden-register', component: AnmeldenRegisterComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {


}


