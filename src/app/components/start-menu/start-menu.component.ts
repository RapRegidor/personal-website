import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {trigger, transition, animate, style} from '@angular/animations';

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
  
  toggleOptions(){
    this.isOptionsOpen = !this.isOptionsOpen;
  }
  closeWindow(){
    window.open('', '_self')?.close();
    alert("Sad that browsers restrict self-closing. Close the tab manually (pretend it closed itself please).");
  }
}
