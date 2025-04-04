import { Component } from '@angular/core';
import { OpeningTabsService } from '../../services/opening-tabs.service';
import { CommonModule } from '@angular/common';
import { ToggleModeService } from '../../services/toggle-mode.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects-window',
  imports: [CommonModule],
  templateUrl: './projects-window.component.html',
  styleUrl: './projects-window.component.css'
})
export class ProjectsWindowComponent {
  currentProjectTab$!: Observable<string>;
  isDarkMode$!: Observable<boolean>;
  constructor(private fileService: OpeningTabsService, private themeService: ToggleModeService){
    this.currentProjectTab$ = this.fileService.currentProjectTab$;
    this.isDarkMode$ = this.themeService.isDarkMode$;
  }
  changeCurrentTab(file: string){
    this.fileService.changeCurrentProjectTab(file);
  }
}
