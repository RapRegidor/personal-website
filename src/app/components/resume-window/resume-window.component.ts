import { Component } from '@angular/core';
import { OpeningFilesService } from '../../services/opening-files.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resume-window',
  imports: [CommonModule],
  templateUrl: './resume-window.component.html',
  styleUrl: './resume-window.component.css'
})
export class ResumeWindowComponent {
  currentFile$!: Observable<string>;
  constructor(private fileService: OpeningFilesService){
    this.currentFile$ = this.fileService.currentFile$;
  }
  changeCurrentFile(file: string){
    this.fileService.changeCurrentFile(file);
  }
}
