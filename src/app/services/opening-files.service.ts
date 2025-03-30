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
  private resume = new BehaviorSubject<boolean>(false);
  private hobbies = new BehaviorSubject<boolean>(false);
  private opened = new BehaviorSubject<string[]>([]);
  private current = new BehaviorSubject<string>("");
  private stack = new BehaviorSubject<string[]>([]);
  //stream - 
  isAboutMeOpen$ = this.aboutMe.asObservable();
  isProjectsOpen$ = this.projects.asObservable();
  isContactsOpen$ = this.contacts.asObservable();
  isResumeOpen$ = this.resume.asObservable();
  isHobbiesOpen$ = this.hobbies.asObservable();
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
    if(file === "resume"){
      this.resume.next(true);
    }
    if(file === "hobbies"){
      this.hobbies.next(true);
    }
    this.current.next(file);
  }
  closeFile(file: string, optionalParam?: number){
    
    if(optionalParam != 1){
      const currentFiles = this.opened.value.filter(keepFile => keepFile !== file);//actually opened (minimized included)
      this.opened.next(currentFiles);
      const currentStackFiles = this.stack.value.filter(keepFile => keepFile !== file);//files on display
      this.stack.next(currentStackFiles);
      this.current.next(this.stack.getValue()[this.stack.getValue().length - 1]);
    }else{
      const currentFiles = this.stack.value.filter(keepFile => keepFile !== file);
      this.stack.next(currentFiles);
      this.current.next(currentFiles[currentFiles.length - 1]);
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
    if(file === "resume"){
      this.resume.next(false);
    }
    if(file === "hobbies"){
      this.hobbies.next(false);
    }
    
  }
  
  drop(event: CdkDragDrop<string[]>) {
    const updatedFiles = [...this.opened.value];
    moveItemInArray(updatedFiles, event.previousIndex, event.currentIndex);
    this.opened.next(updatedFiles);
  }
  
  changeCurrentFile(file: string){
    if(file === "aboutMe" && this.aboutMe.getValue() == false){
      this.aboutMe.next(true);
    }
    if(file === "projects"  && this.projects.getValue() == false){
      this.projects.next(true);
    }
    if(file === "contacts"  && this.contacts.getValue() == false){
      this.contacts.next(true);
    }
    if(file === "resume"  && this.resume.getValue() == false){
      this.resume.next(true);
    }
    if(file === "hobbies"  && this.hobbies.getValue() == false){
      this.hobbies.next(true);
    }
    
    this.current.next(file);
    const currentFiles = this.stack.value.filter(keepFile => keepFile !== file);
    const updatedFiles = [...currentFiles, file];
    this.stack.next(updatedFiles);
  }
}

