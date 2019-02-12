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

  data:SensorData[] = [];

  constructor(private sensorService:SensorService) { }

  ngOnInit() {
    setInterval(() => {
      this.update();
    }, 2000);
  }

  update() {
    this.sensorService.getData(this.data).subscribe(data => {
      this.data = data;
      this.data.forEach(element => {
        this.count(element);
      });
    });
  }

  count(data:SensorData) {
    let circleValue:number = 100 / (data.highestValue / data.value);
    let circleStep:number = Math.abs(circleValue - data.circlePercent) / 10;
    let step:number = Math.abs(data.value - data.currentValue) / 10;
    let interval = setInterval(() => {
      if (Math.abs(data.currentValue - data.value) < 0.01) {
        data.currentValue = data.value;
        data.circlePercent = circleValue;
        clearInterval(interval);
      } else if (data.currentValue < data.value) {
        data.currentValue += step;
        data.circlePercent += circleStep;
      } else {
        data.currentValue -= step;
        data.circlePercent -= circleStep;
      }
      step = Math.abs(data.value - data.currentValue) / 10;
      circleStep = Math.abs(circleValue - data.circlePercent) / 10;
    }, 50);
  }
}
