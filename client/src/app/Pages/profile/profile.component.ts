import { Component, OnInit } from '@angular/core';
import { NavbarDesktopComponent } from '../../Components/navbar-desktop/navbar-desktop.component';
import { NavbarMobileComponent } from '../../Components/navbar-mobile/navbar-mobile.component';
import { SlideShowComponent } from '../../Components/slide-show/slide-show.component';
import { StarRatingComponent } from '../../star-rating/star-rating.component';
import { OpeningHoursComponent } from '../../opening-hours/opening-hours.component';
import { MapComponent } from '../../Components/map/map.component';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../redux/store.service';
import { getOneLaden } from '../../redux/features/Laden/LadenSlice';
import { CalendarComponent } from "../../Components/calendar/calendar.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavbarDesktopComponent,
    NavbarMobileComponent,
    SlideShowComponent,
    StarRatingComponent,
    OpeningHoursComponent,
    MapComponent,
    CalendarComponent,
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  template: `<app-map [mapUrl]="storeMapUrl"></app-map>`,
})
export class ProfileComponent implements OnInit {
  email: any;
  ladenDaten: any = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.email = await params.get('email');
      if (this.email) {
        this.storeService.dispatch(getOneLaden({ email: this.email }));
      }
    });
    this.storeService.subcribe(() => {
      const state = this.storeService.getState().laden;
      this.ladenDaten = state.getOneLaden;
      this.loading = false;
    });
  }

  storeMapUrl =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2583.9976523871533!2d8.343015176880577!3d49.635498845705634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47962d51e2475069%3A0x7936881bc9f3dc4f!2sCaCo%20Friseur!5e0!3m2!1sen!2sde!4v1730632791437!5m2!1sen!2sde" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
}
