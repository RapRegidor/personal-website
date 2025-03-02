import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { OpeningFilesService } from '../../services/opening-files.service';

@Component({
  selector: 'app-main-window',
  imports: [DragDropModule, CommonModule],
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
  //get the window element width and height
  //put a threshold based on cursor
  //get preview of the snapping

}
