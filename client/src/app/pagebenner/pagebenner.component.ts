import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagebenner',
  standalone: true,
  imports: [],
  templateUrl: './pagebenner.component.html',
  styleUrl: './pagebenner.component.css',
})
export class PagebennerComponent {
  @Input() title: string = 'crete neu password';
  @Input() discription: string = 'discover amazing thing near around you';
}
