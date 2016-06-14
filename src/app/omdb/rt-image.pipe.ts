import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({ name: 'rtimage' })
export class RottenTomatoImagePipe implements PipeTransform {
    transform(value: string, args: string[]) {
        let _url = 'assets/img/';
        let result = _url + value + '.png';
      //  console.log(result);
        return result;
    }
}