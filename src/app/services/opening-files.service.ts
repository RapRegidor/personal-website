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
  //stream - 
  isAboutMeOpen$ = this.aboutMe.asObservable();
  isProjectsOpen$ = this.projects.asObservable();
  isContactsOpen$ = this.contacts.asObservable();
  openedFiles$ = this.opened.asObservable();
  currentFile$ = this.current.asObservable();

  openFile(file: string){
    const currentFiles = this.opened.value;
    if(!currentFiles.includes(file)){
      this.opened.next([...currentFiles, file]);
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
  closeFile(file: string){
    const currentFiles = this.opened.value.filter(keepFile => keepFile !== file);
    this.opened.next(currentFiles);
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
  changeCurrentFile(file: string){
    this.current.next(file);
  }
}
