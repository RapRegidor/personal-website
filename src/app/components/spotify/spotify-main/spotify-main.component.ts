import { AfterViewInit, Component, ElementRef, HostListener, Input } from '@angular/core';
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
  
  constructor(private el: ElementRef, private http: HttpClient) {

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
  private userPlaylists = new BehaviorSubject<any | null>(null);
  userPlaylists$ = this.userPlaylists.asObservable();
  ngAfterViewInit(){
    this.http.get<{ playlists?: any }>('http://localhost:3000/userPlaylists', {
      withCredentials: true,
    }).subscribe({
      next: res => {
        this.userPlaylists.next(res.playlists ?? null);
      },
      error: () => {
        this.userPlaylists.next(null);
      }
    });
  }
}
