import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-spotify-login',
  imports: [CommonModule],
  templateUrl: './spotify-login.component.html',
  styleUrl: './spotify-login.component.css'
})
export class SpotifyLoginComponent {

  constructor(private auth: AuthService){

  }
  @ViewChild('brand') brand!: ElementRef;
  @ViewChild('audio') audio!: ElementRef;
  @HostListener('mousemove', ['$event'])
  onCursorMove(event: MouseEvent) {
    
    const rect = this.brand.nativeElement.getBoundingClientRect();

    const xCursor =  Math.max(rect.left - event.clientX, 0, event.clientX - rect.right);
    const yCursor = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom);
    
    const distance = Math.round(Math.sqrt(Math.pow((xCursor), 2) + Math.pow((yCursor), 2)));
    if(distance < 50){
      this.audio.nativeElement.play();
      this.audio.nativeElement.volume = 1 - distance / 50;
    }else{
      this.audio.nativeElement.pause();
    }
  }

  @ViewChild('image') image!: ElementRef;
  @ViewChild('button') button!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  ngAfterViewInit() {
    const resizeObserver = new ResizeObserver(() => {
      const width = this.container.nativeElement.offsetWidth;
      const brandFontSize = width * 0.1;
      const buttonFontSize = width * 0.05;
      const imageSize = width * 0.19;
      console.log(imageSize);
      this.brand.nativeElement.style.fontSize = `${brandFontSize}px`;
      this.button.nativeElement.style.fontSize = `${buttonFontSize}px`;
      this.image.nativeElement.style.width = `${imageSize}px`;
      this.image.nativeElement.style.height = `${imageSize}px`;
    });
    resizeObserver.observe(this.container.nativeElement);
  }
  
  login() {
    const login = window.open('http://localhost:3000/login', 'SpotifyLogin', 'width=600,height=800');
    const receiveMessage = (event:MessageEvent)=>{
      if(event.origin !== 'http://localhost:3000') { 
        console.log('Blocked ', event.origin)
        return;
      }
      if(!event.data){
        console.log('No Data')
        return;
      }
      
      if(!event.data.error){
        console.log('success!');
        this.auth.checkSession();
        //success
      }else if(!event.data.success){
        //error
        console.log(event.data.error);
      }
      window.removeEventListener('message', receiveMessage);
      login?.close();
    }
    window.addEventListener("message", receiveMessage);
    
  }
  
}
