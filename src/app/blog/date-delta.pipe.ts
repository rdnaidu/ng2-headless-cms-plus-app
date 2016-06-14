import { Pipe, PipeTransform } from '@angular/core';


let dateDiff = {

    inDays: function (d1: Date, d2: Date) {
        let t2 = d2.getTime();
        let t1 = d1.getTime();

        return Math.floor((t2 - t1) / (24 * 3600 * 1000));
    },

    inWeeks: function (d1: Date, d2: Date) {
        let t2 = d2.getTime();
        let t1 = d1.getTime();

        return (t2 - t1) / (24 * 3600 * 1000 * 7);
    },

    inMonths: function (d1, d2) {
        let d1Y = d1.getFullYear();
        let d2Y = d2.getFullYear();
        let d1M = d1.getMonth();
        let d2M = d2.getMonth();

        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    },

    inYears: function (d1, d2) {
        return d2.getFullYear() - d1.getFullYear();
    }
};

@Pipe({ name: 'dateDelta' })
export class DateDeltaPipe implements PipeTransform {
    transform(d1: Date, type: string) {
        let result: number;

        // current time
        let d2 = new Date();
     //   console.log(d2);
     //   console.log(type);
        if (type === undefined || type.length === 0) {
            type = 'inDays';
        }
        switch (type) {
            case 'inDays':
                result = dateDiff.inDays(d1, d2);
                break;
            case 'inWeeks':
                result = dateDiff.inWeeks(d1, d2);
                break;
            case 'inMonths':
                result = dateDiff.inMonths(d1, d2);
                break;
            case 'inYears':
                result = dateDiff.inYears(d1, d2);
                break;
            default:
                result = dateDiff.inDays(d1, d2);
                break;
        }
        return result;
    }
}



