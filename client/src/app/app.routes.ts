import { RouterModule, Routes } from '@angular/router';
import { PagebennerComponent } from './pagebenner/pagebenner.component';
import { NgModule } from '@angular/core';
import { SinginComponent } from './singin/singin.component';
import { SingupComponent } from './singup/singup.component';
import { WillkommenComponent } from './willkommen/willkommen.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', component: WillkommenComponent },
  { path: 'login', component: SinginComponent },
  { path: 'singup', component: SingupComponent },
  { path: 'reset', component: ResetPasswordComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
