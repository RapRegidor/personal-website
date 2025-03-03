import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-contacts-window',
  imports: [FormsModule, CommonModule],
  templateUrl: './contacts-window.component.html',
  styleUrl: './contacts-window.component.css'
})
export class ContactsWindowComponent {

  sendEmail(form: NgForm){
    if (form.valid) {
      console.log('Form Submitted:', form.value); // Logs all form data as an object
    } else {
      console.log('Form is invalid!');
    }
  }
}
