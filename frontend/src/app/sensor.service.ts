import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SensorData } from './sensordata';


@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private sensorUrl = 'http://localhost:8000/api/readings';

  constructor(
    private http:HttpClient,
  ) { }

  getData():Observable<SensorData> {
    // let data:SensorData = {id: 1, value1: 10, value2: 16, value3: 64, date: new Date()};
    return this.http.get<SensorData>(this.sensorUrl);
  }
}