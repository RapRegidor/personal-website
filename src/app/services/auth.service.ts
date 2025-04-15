import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<any | null>(null);
  private playlists = new BehaviorSubject<any | null>(null);
  private checkedUser = new BehaviorSubject<boolean>(false);
  private checkedPlaylists = new BehaviorSubject<boolean>(false);
  currentUser$ = this.user.asObservable();
  playlists$ = this.playlists.asObservable();
  checkedUser$ = this.checkedUser.asObservable();
  checkedPlaylists$ = this.checkedPlaylists.asObservable();
  constructor(private http: HttpClient) { 

  }
  getPlaylists(){
    this.http.get<{ playlists?: any }>('http://localhost:3000/userPlaylists', {
      withCredentials: true,
    }).subscribe({
      next: res => {
        this.playlists.next(res.playlists ?? null);
        this.checkedPlaylists.next(true);
      },
      error: () => {
        this.playlists.next(null);
        this.checkedPlaylists.next(false);
      }
    });
  }

  checkSession(){
    this.http.get<{ user?: any }>('http://localhost:3000/session', {
      withCredentials: true,
    }).subscribe({
      next: res => {
        this.user.next(res.user ?? null);
        this.checkedUser.next(true);
      },
      error: () => {
        this.user.next(null);
        this.checkedUser.next(true);
      }
    });
  }
  //logout
}
