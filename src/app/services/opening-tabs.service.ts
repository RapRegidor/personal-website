import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpeningTabsService {
  //observable source - emits it to new subscribers immediately upon subscription
    private current = new BehaviorSubject<string>("projectOne");

    //stream - 
    currentFile$ = this.current.asObservable();

    changeCurrentFile(file: string){
      this.current.next(file);
    }

}
