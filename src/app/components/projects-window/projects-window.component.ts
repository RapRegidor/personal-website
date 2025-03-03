import { Component } from '@angular/core';
import { OpeningTabsService } from '../../services/opening-tabs.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-window',
  imports: [CommonModule],
  templateUrl: './projects-window.component.html',
  styleUrl: './projects-window.component.css'
})
export class ProjectsWindowComponent {
  constructor(public fileService: OpeningTabsService){}
  changeCurrentFile(file: string){
    this.fileService.changeCurrentFile(file);
  }
}
