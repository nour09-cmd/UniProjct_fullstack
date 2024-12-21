import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagebennerComponent } from './Components/pagebenner/pagebenner.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { RecoverPassComponent } from './Pages/recover-pass/recover-pass.component';
import { AnmeldenRegisterComponent } from './Pages/anmelden-register/anmelden-register.component';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { SigninComponent } from './Pages/signin/signin.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { PriseListPageComponent } from './Pages/Dashboard/prise-list-page/prise-list-page.component';
import { LadenProfilePageComponent } from './Pages/Dashboard/laden-profile-page/laden-profile-page.component';
import { ClosedaysPageComponent } from './Pages/Dashboard/closedays-page/closedays-page.component';
import { WeekdaysPageComponent } from './Pages/Dashboard/weekdays-page/weekdays-page.component';
import { AppointmentPageComponent } from './Pages/Dashboard/appointment-page/appointment-page.component';
import { SeiBarberPageComponent } from './Pages/sei-barber-page/sei-barber-page.component';

 function getRoutes(): Routes {
   const user: Routes = [
     { path: '', component: HomePageComponent },
     { path: 'login', component: SigninComponent },
     { path: 'register', component: SignupComponent },
     { path: 'pagebenner', component: PagebennerComponent },
     { path: 'rest', component: ResetPasswordComponent },
     { path: 'changepass', component: ChangePassComponent },
     { path: 'anmelden-register', component: AnmeldenRegisterComponent },
     { path: 'profile/:email', component: ProfileComponent },

     { path: 'recover', component: RecoverPassComponent },

     { path: 'appointment', component: AppointmentPageComponent },
     { path: 'working-days', component: WeekdaysPageComponent },
     { path: 'closed-days', component: ClosedaysPageComponent },
     { path: 'laden-profile', component: LadenProfilePageComponent },
     { path: 'price-list', component: PriseListPageComponent },
     { path: '', redirectTo: '/appointment', pathMatch: 'full' },

     { path: 'seibarber', component: SeiBarberPageComponent },
   ];
   return user;
 }
export const routes: Routes = getRoutes();

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
