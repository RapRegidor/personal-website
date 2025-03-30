import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {trigger, transition, animate, style} from '@angular/animations';
import { OpeningFilesService } from '../../services/opening-files.service';
import { ToggleModeService } from '../../services/toggle-mode.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-start-menu',
  imports: [CommonModule],
  templateUrl: './start-menu.component.html',
  styleUrl: './start-menu.component.css',
  animations:[
    trigger('openClose',[
      transition(':enter',[
        style({height:0, opacity: 0}),
        animate('100ms ease-out', style({height:'*', opacity: 1}))
      ]),
      transition(':leave',[
        style({height:'*', opacity: 1}),
        animate('100ms ease-in', style({height:0, opacity: 0}))
      ]),
    ])
  ],
})
export class StartMenuComponent {
  isOptionsOpen = false;
  isDarkMode$!: Observable<boolean>;
  constructor(private fileService: OpeningFilesService, private themeService: ToggleModeService){
    this.isDarkMode$ = this.themeService.isDarkMode$;
  }
  changeDisplay(file: string){
    return this.themeService.changeDisplay(file);
  }
  toggleOptions(){
    this.isOptionsOpen = !this.isOptionsOpen;
  }
  closeWindow(){
    window.open('', '_self')?.close();
    alert("Sad that browsers restrict self-closing. Close the tab manually (pretend it closed itself please).");
  }
  
  openFile(file: string){
    this.fileService.openFile(file);
  }
  changeCurrentFile(file: string){
    this.fileService.changeCurrentFile(file);
  }
}
