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
  value:number = 0;
  value2:number;

  constructor(private sensorService:SensorService) { }

  ngOnInit() {
    this.update();
    setInterval(() => {
      this.update();
    }, 5000);
    
  }

  update() {
    this.sensorService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
      this.count(this.data.co, 'value');
    });
  }

  count(limit:number, variable:string) {
    let step:number = Math.abs(limit - this[variable]) / 10;
    let interval = setInterval(() => {
      if (Math.abs(this[variable] - limit) < limit/200) {
        this[variable] = limit;
        clearInterval(interval);
      } else if (this[variable] < limit) {
        this[variable] += step;
      } else {
        this[variable] -= step;
      }
      step = Math.abs(limit - this[variable]) / 10;
    }, 50);
  }
}
