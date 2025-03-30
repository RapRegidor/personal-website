import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleModeService {

  private currentMode = new BehaviorSubject<boolean>(false);

  isDarkMode$ = this.currentMode.asObservable();

  toggleMode(file: boolean){
    this.currentMode.next(file);
  }
  changeDisplay(file: string){
    if(!this.currentMode.value){
      if(file === 'aboutMe'){
        return '/aboutMeFile-light.png';
      }
      if(file === 'resume'){
        return '/resumeFile-light.png';
      }
      if(file === 'projects'){
        return '/projectsFile-light.png';
      }
      if(file === 'hobbies'){
        return '/hobbiesFile-light.png';
      }
      if(file === 'contacts'){
        return '/contactsFile-light.png';
      }
    }else{
      if(file === 'aboutMe'){
        return '/aboutMeFile.png';
      }
      if(file === 'resume'){
        return '/resumeFile.png';
      }
      if(file === 'projects'){
        return '/projectsFile.png';
      }
      if(file === 'hobbies'){
        return '/hobbiesFile.png';
      }
      if(file === 'contacts'){
        return '/contactsFile.png';
      }
    }
    return '';
  }
}
