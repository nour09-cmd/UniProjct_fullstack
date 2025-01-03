import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  @Input() Name: string = 'Loading Name';
  @Input() description: string = 'Description';
  @Input() image: string = 'assets/card_img.svg';
  @Input() id: string = '56161';
  showFullDescription: boolean = false;

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }

  get descriptionText(): string {
    return this.showFullDescription
      ? this.description
      : this.description.slice(0, 30);
  }
}
