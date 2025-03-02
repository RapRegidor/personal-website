import { ChangeDetectorRef, Component, Inject, NgZone, OnDestroy, PLATFORM_ID } from '@angular/core';
import { StartMenuComponent } from "../start-menu/start-menu.component";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {trigger, transition, animate, style} from '@angular/animations';
import { WeatherService } from '../../api/weather.service';
import { Subscription } from 'rxjs';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { OpeningFilesService } from '../../services/opening-files.service';

@Component({
  selector: 'app-taskbar',
  imports: [StartMenuComponent, CommonModule, DragDropModule],
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.css',
  animations:[
    trigger('openClose',[
      transition(':enter',[
        style({height:0, opacity: 0}),
        animate('100ms ease-out', style({height:'*', opacity: 1}))
      ]),
      transition(':leave',[
        style({height:'*', opacity: 1}),
        animate('100ms ease-in', style({height:0, opacity: 0}))
      ]),
    ]),
    trigger('openCloseFile',[
      transition(':enter',[
        style({minHeight: '0px', opacity: 0}),
        animate('100ms ease-in', style({height:'*', opacity: 1}))
      ]),
      transition(':leave',[
        style({height:'*', opacity: 1}),
        animate('100ms ease-out', style({minHeight: '0px', opacity: 0}))
      ]),
    ]),
  ],
})
export class TaskbarComponent implements OnDestroy{

  isMenuOpen = false;
  currentDate: number = Date.now(); 

  latitude:number = 40.7128;
  longtitude:number = -74.0060;
  forecast: any;
  weatherColor: any = { color: "white" };
  weatherIcon: any = { color: "fa-question" };

  weatherSubscription: Subscription | undefined;

  private intervalId!: ReturnType<typeof setInterval>;

  searchBar(searchInput: HTMLInputElement) {
    searchInput.focus();
    this.isMenuOpen = true;
  }
  
  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(public fileService: OpeningFilesService, private cdr: ChangeDetectorRef, private ngZone: NgZone,  @Inject(PLATFORM_ID) private platformId: Object, private weatherService: WeatherService) {}
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getWeather(); 
    }
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.ngZone.run(() => {
          this.currentDate = Date.now();
          this.cdr.detectChanges(); 
        });
      }, 1000);
    });
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if(this.weatherSubscription){
      this.weatherSubscription.unsubscribe();
    }
  }

  
  getWeather(){
    this.weatherSubscription = this.weatherService.getForecast(this.latitude, this.longtitude).subscribe({
      next: (result) => {
        this.forecast = result;
        this.weatherColor = this.getWeatherColor(this.forecast?.periods[0]?.shortForecast);
        this.weatherIcon = this.getWeatherIcon(this.forecast?.periods[0]?.shortForecast);
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error('Weather Data Retrieval Error', error);
      }
    });
  }

  getWeatherIcon(shortForecast: string): string {
    if (!shortForecast){
       return "fa-question";
    }
    const forecast = shortForecast.toLowerCase();
    if (forecast.includes("sunny")){
      return "fa-sun";
    }
    if (forecast.includes("cloudy")){
      return "fa-cloud";
    }
    if (forecast.includes("rain")){
      return "fa-cloud-rain";
    }
    if (forecast.includes("thunderstorm")){
      return "fa-bolt";
    }
    if (forecast.includes("snow")){
      return "fa-snowflake";
    }
    return "fa-smog";
  }

  getWeatherColor(shortForecast: string): any{
    if (!shortForecast){
      return {color: "white"};
   }
   const forecast = shortForecast.toLowerCase();
   if (forecast.includes("sunny")){
     return {color: "gold"};
   }
   if (forecast.includes("cloudy")){
     return {color: "gray"};
   }
   if (forecast.includes("rain")){
     return {color: "blue"};
   }
   if (forecast.includes("thunderstorm")){
     return {color: "red"};
   }
   if (forecast.includes("snow")){
     return {color: "cyan"};
   }
   return {color: "white"};
  }

  getIcon(file: string){
    if(file === "aboutMe"){
      return "/aboutMeFile.png";
    }
    if(file === "projects"){
      return "/projectsFile.png"
    }
    if(file === "contacts"){
      return "/contactsFile.png"
    }
    return;
  }
  drop(event: CdkDragDrop<string[]>){
    this.fileService.drop(event);
  }
}
