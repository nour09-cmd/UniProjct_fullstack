import { Component } from '@angular/core';
import { PagebennerComponent } from "../pagebenner/pagebenner.component";
import { UnsereButtonComponent } from "../unsere-button/unsere-button.component";
import { TitleLineComponent } from "../title-line/title-line.component";

@Component({
  selector: 'app-anmelden-register',
  standalone: true,
  imports: [PagebennerComponent, UnsereButtonComponent, TitleLineComponent],
  templateUrl: './anmelden-register.component.html',
  styleUrl: './anmelden-register.component.css'
})
  export class AnmeldenRegisterComponent {
onClicke() {
throw new Error('Method not implemented.');
}

}
