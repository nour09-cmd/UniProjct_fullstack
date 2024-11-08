import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagebennerComponent } from './pagebenner/pagebenner.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { WillkommenComponent } from './willkommen/willkommen.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { AnmeldenRegisterComponent } from './anmelden-register/anmelden-register.component';
import { ResponsiveCardComponent } from './responsive-card/responsive-card.component';
import { ProfileComponent } from './profile/profile.component';
import path from 'path';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';
import { SidebarDashboardComponent } from './sidebar-dashboard/sidebar-dashboard.component';



export const routes: Routes = [
  { path: '', component: WillkommenComponent },
  { path: 'login', component: SigninComponent },
  { path: 'Signup', component: SignupComponent },
  { path: 'pagebenner', component: PagebennerComponent },
  { path: 'rest', component: ResetPasswordComponent },
  { path: 'changepass', component: ChangePassComponent },
  { path: 'anmelden-register', component: AnmeldenRegisterComponent },
  { path : 'desktop_mobile', component: ResponsiveCardComponent},
  { path: 'profile', component: ProfileComponent },
  {path:  'recover', component: RecoverPassComponent },
  {path:  'dashoard', component: SidebarDashboardComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  

}


