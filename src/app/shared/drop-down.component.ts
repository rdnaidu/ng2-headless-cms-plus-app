import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DropdownValue } from './drop-downValue';



@Component({
    selector: 'drop-down',
    template: `
<!--
<div class="btn-group">
    <button type="button" class="btn btn-primary">Language</button>
    <button type="button" class="btn btn-primary dropdown-toggle" 
    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="caret"></span>
    <span class="sr-only">Toggle Dropdown</span>
  </button>
    <ul class="dropdown-menu">
      <li *ngFor="#value of values" (click)="selectItem(value.value)">{{value.label}}</li>
      
    </ul>
    </div>
    -->
    <div class="row">
  
  <div class="col-xs-3">
    <div class="form-group">
      <label class="control-label" *ngIf="labelText">{{labelText}}</label>
      <select class="form-control input-medium" (change)="selectItem($event.target.value)">
      <option *ngFor="#value of values" [value]="value.value" 
          selected={{value.selected}}>{{value.label}}</option>
      </select>
    </div>
  </div>

</div>

  `
})
export class DropdownComponent {
    @Input()
    values: DropdownValue[];

    @Input()
    labelText: string;

    @Output()
    select = new EventEmitter();

    constructor() {

    }

    selectItem(value) {
      //  console.log(value);
        this.select.emit({ selectedValue: value});
    }
}
