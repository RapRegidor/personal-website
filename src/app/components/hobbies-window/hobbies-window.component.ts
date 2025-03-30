import { Component } from '@angular/core';
import { OpeningTabsService } from '../../services/opening-tabs.service';
import { CommonModule } from '@angular/common';
import { ToggleModeService } from '../../services/toggle-mode.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hobbies-window',
  imports: [CommonModule],
  templateUrl: './hobbies-window.component.html',
  styleUrl: './hobbies-window.component.css'
})
export class HobbiesWindowComponent {
  currentHobbyTab$!: Observable<string>;
  isDarkMode$!: Observable<boolean>;

  constructor(private fileService: OpeningTabsService, private themeService: ToggleModeService){
    this.currentHobbyTab$ = this.fileService.currentHobbyTab$;
    this.isDarkMode$ = this.themeService.isDarkMode$;

  }
  changeCurrentTab(file: string){
    this.fileService.changeCurrentHobbyTab(file);
  }
}
