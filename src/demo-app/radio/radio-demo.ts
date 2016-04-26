import {Component} from 'angular2/core';
import {MdRadioButton, MdRadioGroup} from '@angular2-material/radio';
import {MdRadioDispatcher} from '@angular2-material/radio';

@Component({
  selector: 'radio-demo',
  template: require('./radio-demo.html'),
  styles: [require('./radio-demo.scss')],
  providers: [MdRadioDispatcher],
  directives: [MdRadioButton, MdRadioGroup]
})
export class RadioDemo {
  isDisabled: boolean = false;
  favoriteSeason: string = 'Autumn';
  seasonOptions = [
    'Winter',
    'Spring',
    'Summer',
    'Autumn'
  ];
}
