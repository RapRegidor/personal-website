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
  playlists$!: Observable<any | null>;
  checkedUser$!: Observable<boolean>;
  checkedPlaylists$!: Observable<boolean>;
  constructor(private auth: AuthService){
    this.auth.checkSession();
    this.auth.getPlaylists();
    this.user$ = this.auth.currentUser$
    this.playlists$ = this.auth.playlists$
    this.checkedUser$ = this.auth.checkedUser$;
    this.checkedPlaylists$ = this.auth.checkedPlaylists$;
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
