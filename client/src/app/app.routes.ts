import { Routes } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { SigninComponent } from './Pages/signin/signin.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { ProfileComponent } from './Pages/profile/profile.component';

import { PagebennerComponent } from './Components/pagebenner/pagebenner.component';
import { UserAppointmentsComponent } from './Pages/user-appointments/user-appointments.component';
import { AppointmentPageComponent } from './Pages/Dashboard/appointment-page/appointment-page.component';
import { WeekdaysPageComponent } from './Pages/Dashboard/weekdays-page/weekdays-page.component';
import { ClosedaysPageComponent } from './Pages/Dashboard/closedays-page/closedays-page.component';
import { LadenProfilePageComponent } from './Pages/Dashboard/laden-profile-page/laden-profile-page.component';
import { PriseListPageComponent } from './Pages/Dashboard/prise-list-page/prise-list-page.component';
import { SeiBarberPageComponent } from './Pages/sei-barber-page/sei-barber-page.component';

import { RoleGuardBarber } from './role.guard';
import { RoleGuardUSER } from './role.guard';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile/:email', component: ProfileComponent },

  { path: 'pagebenner', component: PagebennerComponent },

  {
    path: '',
    canActivate: [RoleGuardUSER],
    children: [
      { path: 'seibarber', component: SeiBarberPageComponent },
      { path: 'appointmentUser', component: UserAppointmentsComponent },

      { path: 'login', component: SigninComponent },
      { path: 'register', component: SignupComponent },
      { path: 'pagebenner', component: PagebennerComponent },

      { path: '', component: HomePageComponent },
    ],
  },

  {
    path: '',
    canActivate: [RoleGuardBarber],
    children: [
      { path: 'appointment', component: AppointmentPageComponent },
      { path: 'working-days', component: WeekdaysPageComponent },
      { path: 'closed-days', component: ClosedaysPageComponent },
      { path: 'laden-profile', component: LadenProfilePageComponent },
      { path: 'price-list', component: PriseListPageComponent },
      { path: '', redirectTo: 'appointment', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: '' },
];
