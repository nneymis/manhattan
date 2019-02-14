export class Color {

    r:number;
    g:number;
    b:number;

    constructor(r:number, g:number, b:number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    toCss():string {
        return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    }

    hexToRgb(hex:string, i:number):number {
        let match = hex.replace(/#/,'').match(/.{1,2}/g);
        return parseInt(match[i], 16);
    }

    linearInterpolation(left:string, right:string, percentage:number):void {
        let components:string[] = ["r", "g", "b"];
        for (var i = 0; i < components.length; i++) {
            let leftC = this.hexToRgb(left, i);
            let rightC = this.hexToRgb(right, i);
            this[components[i]] = Math.round(leftC + (rightC - leftC) * percentage / 100);
        }
    }

    colorInterpolation(colors:Map<number, string>, percentage:number):void {
        let keys = Array.from(colors.keys());
        let leftPer = 0;
        let rightPer = 100;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key <= percentage) {
                leftPer = key;
            } else {
                rightPer = key;
                break;
            }
        }

        let partPer = (100 * (percentage - leftPer)) / (rightPer - leftPer);

        this.linearInterpolation(colors.get(leftPer), colors.get(rightPer), partPer);
    }
}