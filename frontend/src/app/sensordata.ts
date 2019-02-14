import { Color } from './color';

export class SensorData {
    id:number;
    label:string;
    value:number;
    unit:string;
    highestValue:number;
    created_at:Date;
    //used for displaying:
    currentValue:number;
    circlePercent:number;
    color:Color;
}