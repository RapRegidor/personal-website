import { Component, ElementRef, ViewChild } from '@angular/core';
import { OpeningFilesService } from '../../services/opening-files.service';

@Component({
  selector: 'app-about-me-window',
  imports: [],
  templateUrl: './about-me-window.component.html',
  styleUrl: './about-me-window.component.css'
})
export class AboutMeWindowComponent {
  constructor(public fileService: OpeningFilesService){}
  openFile(file: string){
    this.fileService.openFile(file);
  }
  changeCurrentFile(file: string){
    this.fileService.changeCurrentFile(file);
  }
  @ViewChild('container') container!: ElementRef;
  @ViewChild('aboutMeContainer') destination!: ElementRef;
  scrollDown(){
    this.container.nativeElement.scroll({
      top: this.destination.nativeElement.offsetTop - 50,
      behavior: 'smooth'
    })
  }
}
