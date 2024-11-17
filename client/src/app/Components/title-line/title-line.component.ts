import { Component, Input } from '@angular/core';

@Component({
  selector: 'title-line',
  standalone: true,
  imports: [],
  templateUrl: './title-line.component.html',
  styleUrl: './title-line.component.css',
})
export class TitleLineComponent {
  @Input() titel!: string;
}
