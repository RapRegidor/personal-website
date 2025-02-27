import { Component } from '@angular/core';
import { StartMenuComponent } from "../start-menu/start-menu.component";

@Component({
  selector: 'app-main-window',
  imports: [StartMenuComponent],
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.css'
})
export class MainWindowComponent {

}
