import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { OpeningFilesService } from '../../services/opening-files.service';
import { AboutMeWindowComponent } from "../about-me-window/about-me-window.component";
import { ProjectsWindowComponent } from "../projects-window/projects-window.component";
import { ContactsWindowComponent } from "../contacts-window/contacts-window.component";
import { ResumeWindowComponent } from "../resume-window/resume-window.component";
import { HobbiesWindowComponent } from "../hobbies-window/hobbies-window.component";
import { ToggleModeService } from '../../services/toggle-mode.service';


@Component({
  selector: 'app-main-window',
  imports: [DragDropModule, CommonModule, AboutMeWindowComponent, ProjectsWindowComponent, ContactsWindowComponent, ResumeWindowComponent, HobbiesWindowComponent],
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.css',
})
export class MainWindowComponent {
  constructor(public fileService: OpeningFilesService, public themeService: ToggleModeService){}
  openFile(file: string){
    this.fileService.openFile(file);
  }
  closeFile(file: string){
    this.fileService.closeFile(file);
  }
  changeCurrentFile(file: string){
    this.fileService.changeCurrentFile(file);
  }
  minimizeTab(file: string){
    this.fileService.closeFile(file, 1);
  }

  toggle(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.themeService.toggleMode(checkbox.checked);
  }
  //get the window element width and height
  //put a threshold based on cursor
  //get preview of the snapping
}
