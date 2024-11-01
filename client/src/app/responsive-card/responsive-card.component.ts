import { Component } from '@angular/core';
import { NavbarDesktopComponent } from "../navbar-desktop/navbar-desktop.component";
import { NavbarMobileComponent } from "../navbar-mobile/navbar-mobile.component";
import { CardsComponent } from "../cards/cards.component";

@Component({
  selector: 'app-responsive-card',
  standalone: true,
  imports: [NavbarDesktopComponent, NavbarMobileComponent, CardsComponent],
  templateUrl: './responsive-card.component.html',
  styleUrl: './responsive-card.component.css'
})
export class ResponsiveCardComponent {

}
