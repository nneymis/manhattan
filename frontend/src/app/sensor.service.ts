import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SensorData } from './sensordata';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor() { }

  getData():Observable<SensorData> {
    let data:SensorData = {id: 1, value1: 10, value2: 16, value3: 64, date: new Date()};
    return of(data);
  }
}