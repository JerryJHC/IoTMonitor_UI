import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { SingleMeasure } from '../models/SingleMeasure';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

  baseUrl = "https://us-central1-iotmonitor-9c57a.cloudfunctions.net";

  constructor(private http: HttpClient) { }

  //Ask for the last measure registered
  getLastTemperature(): Observable<SingleMeasure[]> {
    return this.http.get<SingleMeasure[]>(this.baseUrl + "/temperature");
  }

  getLastHumidity(): Observable<SingleMeasure[]> {
    return this.http.get<SingleMeasure[]>(this.baseUrl + "/humidity");
  }

  getLastPressure(): Observable<SingleMeasure[]> {
    return this.http.get<SingleMeasure[]>(this.baseUrl + "/pressure");
  }
  //Ask for the last measure registered

}
