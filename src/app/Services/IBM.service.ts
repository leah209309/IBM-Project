import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IBMService {

  constructor(private http:HttpClient) { }
  getTimeSeries():Observable<any>
  {
     return this.http.get<any>(window.location.origin+'/api');
  }
}
