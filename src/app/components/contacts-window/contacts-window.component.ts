import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgxCaptchaModule, ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-contacts-window',
  imports: [CommonModule, TextFieldModule, FormsModule, NgxCaptchaModule],
  templateUrl: './contacts-window.component.html',
  styleUrl: './contacts-window.component.css'
})
export class ContactsWindowComponent {
  @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;
  
  private captchaResponse: string | null = null;
  siteKey: string;
  sent = false;
  sendSuccess = false;
  sendError = false;

  constructor(private http: HttpClient){
    this.siteKey='6LeQSAsrAAAAADNVURP3vBEu8VRA5UGzZfcBP5QP'
  }

  handleSuccess(response: string): void {
    this.captchaResponse = response;
  }

  handleReset(): void{
    this.captchaResponse = null;
  }

  handleExpire(): void{
    this.captchaResponse = null;
  }

  getCaptchaResponse(){
    return this.captchaResponse;
  }

  sendEmail(form: NgForm){
    
    if (form.valid) {
      this.sent = true;

      this.http.post("https://api.emailjs.com/api/v1.0/email/send",
      {
        lib_version: "4.4.1",
        service_id: "service_4zsckof",
        template_id: "template_ut8oyxj",
        template_params: {...form.value,
          'g-recaptcha-response': this.captchaResponse,
        },
        user_id: "9_fLfwempaf0B82Sy"
      },
      {
        responseType: 'text',
      }).subscribe({
          next: () =>{
            form.reset();
            this.captchaElem.resetCaptcha();
            this.captchaResponse = null;
            this.sent = false;
            this.sendSuccess = true;
            this.sendError = false;
          },
          error: (error) => {
            console.error(error);
            this.captchaElem.resetCaptcha();
            this.captchaResponse = null;
            this.sent = false;
            this.sendSuccess = false;
            this.sendError = true;
          }
        }
      );
    }
  }
}
