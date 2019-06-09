import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SingleMeasure } from '../models/SingleMeasure';
import { TimeRequest } from '../models/TimeRequest';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

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

  //Ask for an interval
  getTemperatures(interval: TimeRequest): Observable<SingleMeasure[]> {
    return this.http.post<SingleMeasure[]>(this.baseUrl + "/temperature", interval, httpOptions);
  }

  getHumidities(interval: TimeRequest): Observable<SingleMeasure[]> {
    return this.http.post<SingleMeasure[]>(this.baseUrl + "/humidity", interval, httpOptions);
  }

  getPressures(interval: TimeRequest): Observable<SingleMeasure[]> {
    return this.http.post<SingleMeasure[]>(this.baseUrl + "/pressure", interval, httpOptions);
  }

}
