import { ChangeDetectorRef, Component, NgZone, OnDestroy } from '@angular/core';
import { StartMenuComponent } from "../start-menu/start-menu.component";
import { CommonModule } from '@angular/common';
import {trigger, transition, state, animate, style} from '@angular/animations';

@Component({
  selector: 'app-taskbar',
  imports: [StartMenuComponent, CommonModule],
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.css',
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
export class TaskbarComponent implements OnDestroy{

  isMenuOpen = false;
  searchBar(searchInput: HTMLInputElement) {
    searchInput.focus();
    this.isMenuOpen = true;
  }
  
  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  currentDate: number = Date.now(); 
  private intervalId!: ReturnType<typeof setInterval>;
  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}
  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.ngZone.run(() => {
          this.currentDate = Date.now();
          this.cdr.detectChanges(); 
        });
      }, 1000);
    });
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
