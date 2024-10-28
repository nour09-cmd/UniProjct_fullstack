import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagebennerComponent } from './pagebenner/pagebenner.component';
import { SinginComponent } from './singin/singin.component';
import { SingupComponent } from './singup/singup.component';
import { WillkommenComponent } from './willkommen/willkommen.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { AnmeldenRegisterComponent } from './anmelden-register/anmelden-register.component';



export const routes: Routes = [
  { path: '', component: WillkommenComponent },
  { path: 'login', component: SinginComponent },
  { path: 'singup', component: SingupComponent },
  { path: 'pagebenner', component: PagebennerComponent },
  { path: 'rest', component: ResetPasswordComponent },
  { path: 'changepass', component: ChangePassComponent },
  { path: 'anmelden-register', component: AnmeldenRegisterComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
