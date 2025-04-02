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
  swimImages = [
    '/swimming1.jpg',
    '/swimming2.jpg',
    '/swimming3.jpg'
  ];
  
  currentSwimIndex = 0;
  
  prevSwimImage() {
    this.currentSwimIndex = (this.currentSwimIndex - 1 + this.swimImages.length) % this.swimImages.length;
  }
  
  nextSwimImage() {
    this.currentSwimIndex = (this.currentSwimIndex + 1) % this.swimImages.length;
  }

  hikingCampingImages = [
    '/hiking-and-camping2.jpg',
    '/hiking-and-camping3.JPG',
    '/hiking-and-camping4.jpg',
    '/hiking-and-camping5.jpg'
  ];
  
  currentHCIndex = 0;
  
  prevHCImage() {
    this.currentHCIndex = (this.currentHCIndex - 1 + this.hikingCampingImages.length) % this.hikingCampingImages.length;
  }
  
  nextHCImage() {
    this.currentHCIndex = (this.currentHCIndex + 1) % this.hikingCampingImages.length;
  }

  drawingImages = [
    '/drawing1.jpg',
    '/drawing2.jpg',
    '/drawing3.jpg',
    '/drawing4.jpg'
  ];
  
  currentDrawingIndex = 0;
  
  prevDrawingImage() {
    this.currentDrawingIndex = (this.currentDrawingIndex - 1 + this.drawingImages.length) % this.drawingImages.length;
  }
  
  nextDrawingImage() {
    this.currentDrawingIndex = (this.currentDrawingIndex + 1) % this.drawingImages.length;
  }
}
