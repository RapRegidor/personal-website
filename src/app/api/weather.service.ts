import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  constructor(private http: HttpClient) { }
  getForecast(latitude: number, longitude: number): Observable<any>{
    const url = `https://api.weather.gov/points/${latitude},${longitude}`; //will change this later so user can see different state's weather
  
    const httpHeader = new HttpHeaders({
      'User-Agent': environment.userAgent,
      'Accept': 'application/ld+json',
    });
    
    return this.http.get<any>(url, { headers: httpHeader }).pipe(
      switchMap(response => {
        
        const gridID = response.gridId;
        const gridX = response.gridX;
        const gridY = response.gridY;
        const finalUrl = `https://api.weather.gov/gridpoints/${gridID}/${gridX},${gridY}/forecast`;
    
        return this.http.get(finalUrl, { headers: httpHeader })
      })
    );
  }
  
}
