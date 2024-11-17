import { RouterModule, Routes } from '@angular/router';
import { NgModule, OnInit } from '@angular/core';
import { PagebennerComponent } from './Components/pagebenner/pagebenner.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { ResponsiveCardComponent } from './Pages/responsive-card/responsive-card.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { RecoverPassComponent } from './Pages/recover-pass/recover-pass.component';
import { SidebarDashboardComponent } from './Dashboard/sidebar-dashboard/sidebar-dashboard.component';
import { AnmeldenRegisterComponent } from './Pages/anmelden-register/anmelden-register.component';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { SigninComponent } from './Pages/signin/signin.component';
import { SignupComponent } from './Pages/signup/signup.component';

export const routes: Routes = [
  // { path: '', component: WillkommenComponent },
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'pagebenner', component: PagebennerComponent },
  { path: 'rest', component: ResetPasswordComponent },
  { path: 'changepass', component: ChangePassComponent },
  { path: 'anmelden-register', component: AnmeldenRegisterComponent },
  { path: '', component: ResponsiveCardComponent },
  // { path: 'profile', component: ProfileComponent },
  { path: 'profile/:email', component: ProfileComponent },

  { path: 'recover', component: RecoverPassComponent },
  { path: 'dashoard', component: SidebarDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
