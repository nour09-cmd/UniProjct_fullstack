import { RouterModule, Routes } from '@angular/router';
import { PagebennerComponent } from './pagebenner/pagebenner.component';
import { NgModule } from '@angular/core';
import { SinginComponent } from './singin/singin.component';
import { SingupComponent } from './singup/singup.component';
import { ChangePassComponent } from './change-pass/change-pass.component';

export const routes: Routes = [
  { path: 'login', component: SinginComponent },
  { path: 'singup', component: SingupComponent },
  { path: 'changePass', component: ChangePassComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
