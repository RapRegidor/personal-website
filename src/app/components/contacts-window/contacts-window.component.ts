import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacts-window',
  imports: [FormsModule, CommonModule],
  templateUrl: './contacts-window.component.html',
  styleUrl: './contacts-window.component.css'
})
export class ContactsWindowComponent {
  constructor(private http: HttpClient){}
  sendEmail(form: NgForm){
    
    if (form.valid) {
      
      this.http.post("https://api.emailjs.com/api/v1.0/email/send",
      {
        lib_version: "4.4.1",
        service_id: "service_qsp5msc",
        template_id: "template_ut8oyxj",
        template_params: {...form.value},
        user_id: "9_fLfwempaf0B82Sy"
      },
      {
        responseType: 'text',
      }).subscribe(() => 
        console.log('Successfully sent!')
      );
    } else {
      console.log('Form is invalid!');
    }
  }
}
