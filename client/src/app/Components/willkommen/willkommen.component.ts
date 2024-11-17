import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { getUserData } from '../../redux/features/User/UserSlice';
import { StoreService } from '../../redux/store.service';

@Component({
  selector: 'app-willkommen',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './willkommen.component.html',
  styleUrl: './willkommen.component.css',
})
export class WillkommenComponent {}
