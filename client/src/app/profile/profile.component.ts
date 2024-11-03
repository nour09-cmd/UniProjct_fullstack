import { Component } from '@angular/core';
import { NavbarDesktopComponent } from "../navbar-desktop/navbar-desktop.component";
import { NavbarMobileComponent } from "../navbar-mobile/navbar-mobile.component";
import { SlideShowComponent } from "../slide-show/slide-show.component";
import { CalendarComponent } from "../calendar/calendar.component";
import { OpeningHoursComponent } from "../opening-hours/opening-hours.component";
import { MapComponent } from "../map/map.component";



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarDesktopComponent, NavbarMobileComponent, SlideShowComponent, CalendarComponent, OpeningHoursComponent, MapComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  template: `<app-map [mapUrl]="storeMapUrl"></app-map>`,
})
export class ProfileComponent {
  storeMapUrl = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2583.9976523871533!2d8.343015176880577!3d49.635498845705634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47962d51e2475069%3A0x7936881bc9f3dc4f!2sCaCo%20Friseur!5e0!3m2!1sen!2sde!4v1730632791437!5m2!1sen!2sde" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

}
