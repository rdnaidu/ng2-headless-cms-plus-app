import { Component } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';

@Component({
  selector: 'toolbar-demo',
  template: require('./toolbar-demo.html'),
  styles: [ require('./toolbar-demo.scss')],
  directives: [MdToolbar]
})
export class ToolbarDemo {

}
