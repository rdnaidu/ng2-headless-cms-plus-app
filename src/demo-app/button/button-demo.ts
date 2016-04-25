import {Component} from 'angular2/core';
import {MdButton, MdAnchor} from '@angular2-material/button';

@Component({
    selector: 'button-demo',
    template: require('./button-demo.html'),
    styles: [ require('./button-demo.scss')],
    directives: [MdButton, MdAnchor]
})
export class ButtonDemo {
  isDisabled: boolean = false;
  clickCounter: number = 0;
}
