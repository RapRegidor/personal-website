import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-spotify-main',
  imports: [CommonModule],
  templateUrl: './spotify-main.component.html',
  styleUrl: './spotify-main.component.css',
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
    ]),
  ],
})
export class SpotifyMainComponent implements AfterViewInit {
  @Input() user: any;
  @Input() userPlaylists: any;
  
  
  constructor(private el: ElementRef, private http: HttpClient, private cdr: ChangeDetectorRef) {

  }
  


  @ViewChildren('cards') cards!: QueryList<ElementRef>;

  @HostListener('window:wheel', ['$event'])
  onMouseWheel(event: WheelEvent) {
    console.log('Wheel delta:', event.deltaY);
  }

  private index = 0;
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    //need to check if div is on the top (active file)
    if(event.key === 'ArrowDown'){

      //check two above and two below so max would should be 60
      //min is -60
      console.log('Key pressed:', event.key);
      this.index = 0;//index should be center

      const card = this.cards.get(this.index);
      const maxLength = this.cards.length;
      if(card){
        card.nativeElement.classList.add('active-file');
      }
    }else if(event.key === 'ArrowUp'){
      console.log('Key pressed:', event.key);
    }
      
  }

  @ViewChildren('playlistNameContainers') playlistNameContainers!: QueryList<ElementRef>;
  @ViewChildren('playlistNames') playlistNames!: QueryList<ElementRef>;

  ngAfterViewInit(){
    // this.playlistNameContainers.changes.subscribe(() => {
    //   this.attachResizeObserver();
    // });
    // this.attachResizeObserver();
  }

  attachResizeObserver() {
    const first = this.playlistNameContainers.get(0);
    if (first) {
      const resizeObserver = new ResizeObserver(() => {
        const width = this.el.nativeElement.offsetWidth;
        const playlistNameFontSize = Math.max(24, Math.min(width * 0.025, 36));
        this.playlistNames.forEach(entry => {
          entry.nativeElement.style.fontSize = `${playlistNameFontSize}px`;
        });
      });
      resizeObserver.observe(first.nativeElement);
    }
  }

}
