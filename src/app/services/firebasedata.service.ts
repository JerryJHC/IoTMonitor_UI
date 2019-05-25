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

  getTemperature(): Observable<SingleMeasure> {
    return this.http.get<SingleMeasure>(this.baseUrl + "/temperature");
  }

}
