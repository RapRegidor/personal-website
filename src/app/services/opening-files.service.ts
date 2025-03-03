import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpeningFilesService {

  //observable source - emits it to new subscribers immediately upon subscription
  private aboutMe = new BehaviorSubject<boolean>(false);
  private projects = new BehaviorSubject<boolean>(false);
  private contacts = new BehaviorSubject<boolean>(false);
  private opened = new BehaviorSubject<string[]>([]);
  private current = new BehaviorSubject<string>("");
  private stack = new BehaviorSubject<string[]>([]);
  //stream - 
  isAboutMeOpen$ = this.aboutMe.asObservable();
  isProjectsOpen$ = this.projects.asObservable();
  isContactsOpen$ = this.contacts.asObservable();
  openedFiles$ = this.opened.asObservable();
  currentFile$ = this.current.asObservable();
  currentStack$ = this.stack.asObservable();

  openFile(file: string){
    const currentFiles = this.opened.value;
    if(!currentFiles.includes(file)){
      this.opened.next([...currentFiles, file]);
      this.stack.next(this.opened.value);
    }
    if(file === "aboutMe"){
      this.aboutMe.next(true);
    }
    if(file === "projects"){
      this.projects.next(true);
    }
    if(file === "contacts"){
      this.contacts.next(true);
    }
    this.current.next(file);
  }
  closeFile(file: string, optionalParam?: number){
    if(optionalParam != 1){
      console.log("HI!");
      const currentFiles = this.opened.value.filter(keepFile => keepFile !== file);
      this.opened.next(currentFiles);
    }

    if(file === "aboutMe"){
      this.aboutMe.next(false);
    }
    if(file === "projects"){
      this.projects.next(false);
    }
    if(file === "contacts"){
      this.contacts.next(false);
    }
    this.current.next("");
  }
  
  drop(event: CdkDragDrop<string[]>) {
    const updatedFiles = [...this.opened.value];
    moveItemInArray(updatedFiles, event.previousIndex, event.currentIndex);
    this.opened.next(updatedFiles);
  }
  changeCurrentFile(file: string, optionalParam?: number){
    if(file === "aboutMe" && this.aboutMe.getValue() == false){
      this.aboutMe.next(true);
    }
    if(file === "projects"  && this.projects.getValue() == false){
      this.projects.next(true);
    }
    if(file === "contacts"  && this.contacts.getValue() == false){
      this.contacts.next(true);
    }
    
    this.current.next(file);
    const currentFiles = this.stack.value.filter(keepFile => keepFile !== file);
    const updatedFiles = [...currentFiles, file];
    this.stack.next(updatedFiles);
  }
}
