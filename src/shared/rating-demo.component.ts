

import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Rating} from 'ng2-bootstrap/ng2-bootstrap';

// webpack html imports
let template = require('./rating-demo.component.html');

@Component({
  selector: 'rating-demo',
  directives: [Rating, FORM_DIRECTIVES, CORE_DIRECTIVES],
  template: template
})
export class RatingDemoComponent {
  public max:number = 5;
  public rate:number = 5;
  public isReadonly:boolean = false;

  public overStar:number;
  public percent:number;

  public hoveringOver(value:number):void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };

  public resetStar():void {
    this.overStar = void 0;
  }
}

