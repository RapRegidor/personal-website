import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<any | null>(null);
  private checked = new BehaviorSubject<boolean>(false);
  currentUser$ = this.user.asObservable();
  checked$ = this.checked.asObservable()
  constructor(private http: HttpClient) { 

  }
  checkSession(){
    this.http.get<{ user?: any }>('http://localhost:3000/session', {
      withCredentials: true,
    }).subscribe({
      next: res => {
        this.user.next(res.user ?? null);
        this.checked.next(true);
      },
      error: () => {
        this.user.next(null);
        this.checked.next(true);
      }
    });
  }
  //logout
}
