import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyLoginComponent } from "./spotify-login/spotify-login.component";
import { AuthService } from '../../services/auth.service';
import { SpotifyMainComponent } from "./spotify-main/spotify-main.component";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spotify',
  imports: [CommonModule, SpotifyLoginComponent, SpotifyMainComponent],
  templateUrl: './spotify.component.html',
  styleUrl: './spotify.component.css'
})
export class SpotifyComponent{
  user$!: Observable<any | null>;
  checked$!: Observable<boolean>;
  constructor(private auth: AuthService){
    this.auth.checkSession();
    this.user$ = this.auth.currentUser$
    this.checked$ = this.auth.checked$;
  }
  @ViewChild('container') container!: ElementRef;
  // @ViewChild('circle') circle!: ElementRef;
  @HostListener('mousemove', ['$event'])
  onCursorMove(event: MouseEvent) {
    const rect = this.container.nativeElement.getBoundingClientRect();
    const xCursor =  (event.clientX - rect.left) / rect.width;
    const yCursor = (event.clientY - rect.top) / rect.height;
    this.container.nativeElement.style.background = `radial-gradient(circle at ${xCursor * 100}% ${yCursor * 100}%, rgb(28, 27, 83), rgb(28, 25, 42))`;
    
  }
}
