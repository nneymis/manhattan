import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SensorData } from './sensordata';
import { Color } from './color';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private sensorUrl = 'http://localhost/manhattan/backend/public/api/readings';

  constructor(
    private http:HttpClient,
  ) { }

  getData(oldData:SensorData[]):Observable<SensorData[]> {
    let subject = new Subject<SensorData[]>();
    this.http.get<SensorData[]>(this.sensorUrl).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        data[i].currentValue = oldData[i] ? oldData[i].currentValue : 0;
        data[i].circlePercent = oldData[i] ? oldData[i].circlePercent : 0;
        data[i].color = oldData[i] ? oldData[i].color : new Color(200, 150, 30);
      }
      subject.next(data);
    });

    return subject.asObservable();
  }
}