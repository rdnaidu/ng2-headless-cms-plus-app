import { Component } from '@angular/core';
import { MdButton } from '@angular2-material/button';
import { MdProgressCircle, MdSpinner } from '@angular2-material/progress-circle/progress-circle';

@Component({
  selector: 'progress-circle-demo',
  template: require('./progress-circle-demo.html'),
  styles: [require('./progress-circle-demo.scss')],
  directives: [MdProgressCircle, MdSpinner, MdButton]
})
export class ProgressCircleDemo {
  progressValue: number = 40;

  step(val: number) {
    this.progressValue += val;
  }

}
