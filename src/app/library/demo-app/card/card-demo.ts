import { Component } from '@angular/core';
import { MdButton } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';

@Component({
    selector: 'card-demo',
    template: require('./card-demo.html'),
    styles: [require('./card-demo.scss')],
    directives: [MD_CARD_DIRECTIVES, MdButton]
})
export class CardDemo {}
