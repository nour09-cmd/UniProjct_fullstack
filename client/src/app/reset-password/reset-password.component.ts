import { Component } from '@angular/core';
import { OurBTNComponent } from "../our-btn/our-btn.component";
import { OurBtnGoldComponent } from "../our-btn-gold/our-btn-gold.component";
import { PagebennerComponent } from "../pagebenner/pagebenner.component";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [OurBTNComponent, OurBtnGoldComponent, PagebennerComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

}
