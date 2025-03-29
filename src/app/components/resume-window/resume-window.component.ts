import { Component } from '@angular/core';
import { OpeningFilesService } from '../../services/opening-files.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume-window',
  imports: [CommonModule],
  templateUrl: './resume-window.component.html',
  styleUrl: './resume-window.component.css'
})
export class ResumeWindowComponent {
  constructor(public fileService: OpeningFilesService){}
  changeCurrentFile(file: string){
    this.fileService.changeCurrentFile(file);
  }
}
