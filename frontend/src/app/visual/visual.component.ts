import { Component, OnInit } from '@angular/core';

import { faCog } from '@fortawesome/free-solid-svg-icons';

import { SensorData } from '../sensordata';
import { SensorService } from '../sensor.service';

const colors = new Map<number, string>(
  [
    [0, '#48a236'],
    [50, '#00eaff'],
    [100, '#bd3636']
  ]
);

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.scss']
})
export class VisualComponent implements OnInit {
  faCog = faCog;

  data:SensorData[] = [];
  color:string = '#eee';

  constructor(private sensorService:SensorService) { }

  ngOnInit() {
    this.update();
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
        data.color.colorInterpolation(colors, data.circlePercent);
        clearInterval(interval);
      } else if (data.currentValue < data.value) {
        data.currentValue += step;
        data.circlePercent += circleStep;
        data.color.colorInterpolation(colors, data.circlePercent);
      } else {
        data.currentValue -= step;
        data.circlePercent -= circleStep;
        data.color.colorInterpolation(colors, data.circlePercent);
      }
      step = Math.abs(data.value - data.currentValue) / 10;
      circleStep = Math.abs(circleValue - data.circlePercent) / 10;
    }, 50);
  }
}
