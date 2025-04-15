import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskbarComponent } from "./components/taskbar/taskbar.component";
import { MainWindowComponent } from "./components/main-window/main-window.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskbarComponent, MainWindowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'personal-website';

}
