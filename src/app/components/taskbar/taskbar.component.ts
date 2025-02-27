import { Component } from '@angular/core';
import { StartMenuComponent } from "../start-menu/start-menu.component";

@Component({
  selector: 'app-taskbar',
  imports: [StartMenuComponent],
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.css'
})
export class TaskbarComponent {
  searchBar(searchInput: HTMLInputElement) {
    searchInput.focus();
  }
  toggleMenu(){

  }
}
