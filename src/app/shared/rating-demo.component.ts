

import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {RatingComponent} from 'ng2-bootstrap/ng2-bootstrap';
import {NgModel} from '@angular/common';


// webpack html imports
let template = require('./rating-demo.component.html');

@Component({
  selector: 'rating-demo',
  directives: [RatingComponent, FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers: [NgModel],
  template: template
})
export class RatingDemoComponent {
  public max: number = 5;
  public rate: number = 5;
  public isReadonly: boolean = false;

  public overStar: number;
  public percent: number;

  public hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };

  public resetStar(): void {
    this.overStar = void 0;
  }
}

