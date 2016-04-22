
import {Component, Input} from 'angular2/core';
import {LikeComponent} from '../shared/like.component';
import {RatingDemoComponent} from '../shared/rating-demo.component';

@Component({
    selector: 'tweet',
    template: `
<div class="panel panel-default">
<div class="media">
  <div class="media-left">
    <img class="media-object thumbnail" src="{{ data.imageUrl }}" alt="...">
  </div>
  <div class="media-body">
    <h4 class="media-heading">
        {{ data.author }} <span class="handle">{{ data.handle }}</span>
    </h4>
    {{ data.body }}
    <div>
        <like [totalLikes]="data.totalLikes" [iLike]="data.iLike"></like>&nbsp;
        <rating-demo></rating-demo>
    </div>
  </div>
</div> 
</div>   
    `,
    directives: [LikeComponent,RatingDemoComponent]
})
export class TweetComponent {
    constructor() {
     //   console.log(this.data);
    }
    @Input() data;
}