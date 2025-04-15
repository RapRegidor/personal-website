import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-spotify-main',
  imports: [CommonModule],
  templateUrl: './spotify-main.component.html',
  styleUrl: './spotify-main.component.css'
})
export class SpotifyMainComponent implements AfterViewInit {
  @Input() user: any;
  @Input() userPlaylists: any;
  
  constructor(private el: ElementRef, private http: HttpClient, private cdr: ChangeDetectorRef) {

  }
  
  // @HostListener('wheel', ['$event'])
  // @HostListener('keydown', ['$event'])
  // onMousewheel(event: KeyboardEvent | WheelEvent) {
  //   if (event instanceof KeyboardEvent) {
  //     console.log('Key pressed:', event.key);
  //   } else if (event instanceof WheelEvent) {
  //     console.log('Wheel delta:', event.deltaY);
  //   }
  // }
  @ViewChild('playlistNameContainer') playlistNameContainer!: ElementRef;
  @ViewChild('playlistName') playlistName!: ElementRef;

  ngAfterViewInit(){
    const resizeObserver = new ResizeObserver(() => {
      const width = this.playlistNameContainer.nativeElement.offsetWidth;
      const playlistNameFontSize = Math.max(36, Math.min(width * 0.15, 56));
      this.playlistName.nativeElement.style.fontSize = `${playlistNameFontSize}px`;
    });
    resizeObserver.observe(this.playlistNameContainer.nativeElement);
  }
  

}
