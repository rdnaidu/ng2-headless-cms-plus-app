
import {Component, Input} from '@angular/core';

@Component({
    selector: 'like',
    template: `
    <i class="fa fa-heart" 
       aria-hidden="true"
       [class.highlighted]="iLike"
       (click)="onClick()"
       >
    </i>
    <span>{{ totalLikes }}</span>
    `,
    styles: [`
          
        .fa-heart {
            color: #ccc;
            cursor: pointer;
        }
        
        .highlighted {
            color: deeppink;
        }   
    `]
})
export class LikeComponent {
    @Input() totalLikes = 0;
    @Input() iLike = false;

    onClick() {
        this.iLike = !this.iLike;
        this.totalLikes += this.iLike ? 1 : -1;
    }
}
