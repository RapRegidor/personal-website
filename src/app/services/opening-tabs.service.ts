import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpeningTabsService {
  //observable source - emits it to new subscribers immediately when subscribed
  private currentProject = new BehaviorSubject<string>("projectOne");
  private currentHobby = new BehaviorSubject<string>("hobbyOne");

  //stream - 
  currentProjectTab$ = this.currentProject.asObservable();
  currentHobbyTab$ = this.currentHobby.asObservable();

  changeCurrentProjectTab(file: string){
    this.currentProject.next(file);
  }
  changeCurrentHobbyTab(file: string){
    this.currentHobby.next(file);
  }

}
