import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
 @Input() Name  : string = ' Laden Name' ;
 @Input() description : string = "Description";
 @Input() image: string = 'assets/card_img.svg'; 
}
