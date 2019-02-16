import { Component, OnInit } from '@angular/core';

import { faTimes, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material';

import { SensorData } from '../sensordata';
import { SensorService } from '../sensor.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  faTimes = faTimes;
  faPlus = faPlus;
  faSave = faSave;

  data:SensorData[] = [];

  constructor(private sensorService:SensorService, public snackBar:MatSnackBar) { }

  ngOnInit() {
    this.sensorService.getData(this.data).subscribe(data => this.data = data);
  }

  newData() {
    this.sensorService.newData(new SensorData).subscribe(
      data => this.data = data
    );
  }

  deleteData() {
    this.sensorService.deleteData().subscribe(
      data => this.data = data
    );
  }

  updateData(data:SensorData) {
    this.sensorService.updateData(data).subscribe(
      data => {
        this.data = data
        let snackBarRef = this.snackBar.open('Saved!');
      }
    );
  }
 
}
