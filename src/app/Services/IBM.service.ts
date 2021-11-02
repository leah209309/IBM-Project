import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IBMService {

  constructor(private http:HttpClient) { }
  //שליפה באמצעות קובץ  proxy
  //ע"מ לאפשר גישה לאתרים מאובטחים ולמנוע את השגיאה הבאה:
  //CORS policy: No 'Access-Control-Allow-Origin'
  getTimeSeries():Observable<any>
  {
     return this.http.get<any>(window.location.origin+'/api');
  }
}
