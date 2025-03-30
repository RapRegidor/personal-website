import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'app-contacts-window',
  imports: [FormsModule, CommonModule, TextFieldModule],
  templateUrl: './contacts-window.component.html',
  styleUrl: './contacts-window.component.css'
})
export class ContactsWindowComponent {
  constructor(private http: HttpClient){}
  sendEmail(form: NgForm){
    
    if (form.valid) {
      form.reset();
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
    }
  }
  
}
