import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { OpeningFilesService } from '../../services/opening-files.service';
import { AboutMeWindowComponent } from "../about-me-window/about-me-window.component";
import { ProjectsWindowComponent } from "../projects-window/projects-window.component";
import { ContactsWindowComponent } from "../contacts-window/contacts-window.component";

@Component({
  selector: 'app-main-window',
  imports: [DragDropModule, CommonModule, AboutMeWindowComponent, ProjectsWindowComponent, ContactsWindowComponent],
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.css',
})
export class MainWindowComponent {
  constructor(public fileService: OpeningFilesService){}
  openFile(file: string){
    this.fileService.openFile(file);
  }
  closeFile(file: string){
    this.fileService.closeFile(file);
  }
  changeCurrentFile(file: string){
    this.fileService.changeCurrentFile(file);
  }
  //get the window element width and height
  //put a threshold based on cursor
  //get preview of the snapping
}
