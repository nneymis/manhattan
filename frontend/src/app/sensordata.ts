import { Color } from './color';

export class SensorData {
    id:number;
    label:string = "Gas";
    value:number = 0;
    unit:string = "ppm";
    highestValue:number = 100;
    created_at:Date;
    //used for displaying:
    currentValue:number;
    circlePercent:number;
    color:Color;
}