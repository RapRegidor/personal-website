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
import { Observable } from 'rxjs';


@Component({
  selector: 'app-main-window',
  imports: [DragDropModule, CommonModule, AboutMeWindowComponent, ProjectsWindowComponent, ContactsWindowComponent, ResumeWindowComponent, HobbiesWindowComponent],
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.css',
})
export class MainWindowComponent {
  isDarkMode$!: Observable<boolean>;
  currentStack$!: Observable<string[]>;
  isAboutMeOpen$!: Observable<boolean>;
  isResumeOpen$!: Observable<boolean>;
  isProjectsOpen$!: Observable<boolean>;
  isHobbiesOpen$!: Observable<boolean>;
  isContactsOpen$!: Observable<boolean>;

  constructor(private fileService: OpeningFilesService, private themeService: ToggleModeService){
    this.currentStack$ = this.fileService.currentStack$;
    this.isDarkMode$ = this.themeService.isDarkMode$;
    this.isAboutMeOpen$ = this.fileService.isAboutMeOpen$;
    this.isResumeOpen$ = this.fileService.isResumeOpen$;
    this.isProjectsOpen$ = this.fileService.isProjectsOpen$;
    this.isHobbiesOpen$ = this.fileService.isHobbiesOpen$;
    this.isContactsOpen$ = this.fileService.isContactsOpen$;
  }
  changeDisplay(file: string){
    return this.themeService.changeDisplay(file);
  }
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
  maximizeAbtMe = false;
  maximizeResume = false;
  maximizeProjects = false;
  maximizeHobbies = false;
  maximizeContacts = false;
  resizeFile(file: string){
    if(file === 'aboutMe'){
      this.maximizeAbtMe = !this.maximizeAbtMe;
    }
    if(file === 'resume'){
      this.maximizeResume = !this.maximizeResume;
    }
    if(file === 'projects'){
      this.maximizeProjects = !this.maximizeProjects;
    }
    if(file === 'hobbies'){
      this.maximizeHobbies = !this.maximizeHobbies;
    }
    if(file === 'contacts'){
      this.maximizeContacts = !this.maximizeContacts;
    }
  }
}
