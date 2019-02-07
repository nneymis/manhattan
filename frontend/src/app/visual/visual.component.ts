import { Component, OnInit } from '@angular/core';

import { SensorData } from '../sensordata';
import { SensorService } from '../sensor.service';

const maxPercent = 75;

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.scss']
})
export class VisualComponent implements OnInit {

  data:SensorData;
  value:number;
  value2:number;

  constructor(private sensorService:SensorService) { }

  ngOnInit() {
    this.sensorService.getData().subscribe(data => {
      this.data = data;
      this.count(this.data.value3, 'value2', 'value');
    });
  }

  count(limit:number, text:string, spinner:string) {
    this[text] = 0;
    this[spinner] = 0;

    let spinnerLimit = limit / 100 * maxPercent;
    let interval = setInterval(() => {
      if (this[text] < limit) {
        this[text]++;
        this[spinner] += (maxPercent / 100);
      } else {
        this[text] = limit;
        this[spinner] = spinnerLimit;
        clearInterval(interval);
      }
    }, 50);
  }
}
