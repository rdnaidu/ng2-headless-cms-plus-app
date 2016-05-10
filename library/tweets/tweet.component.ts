
import {Component, Input} from '@angular/core';
import {LikeComponent} from '../shared/like.component';
import {RatingDemoComponent} from '../shared/rating-demo.component';
import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';

@Component({
    selector: 'tweet',
    template: require('./tweet.component.html'),
    styles: [require('assets/css/tweet.scss')],
    directives: [LikeComponent,RatingDemoComponent,MD_CARD_DIRECTIVES, MdButton]
})
export class TweetComponent {
    constructor() {
     //   console.log(this.data);
    }
    @Input() data;
}