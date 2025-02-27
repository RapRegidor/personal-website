import { Component } from '@angular/core';
import { StartMenuComponent } from "../start-menu/start-menu.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-taskbar',
  imports: [StartMenuComponent, CommonModule],
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.css'
})
export class TaskbarComponent {
  isMenuOpen = false;
  searchBar(searchInput: HTMLInputElement) {
    searchInput.focus();
    this.isMenuOpen = true;
  }
  
  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }
}
