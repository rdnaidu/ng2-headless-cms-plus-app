import { Component, OnInit , Input , Output , EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { MdButton } from '@angular2-material/button';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { LikeComponent } from '../shared/like.component';

import { BlogPost } from '../blog-list/blog';


@Component({
  selector: 'blog-content',
  template: require('./blog-content.component.html'),
  directives: [
    ROUTER_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdButton,
    MD_CARD_DIRECTIVES,
    LikeComponent
  ],
  styles: [require('./blog-content.component.scss')]
})
export class BlogContentComponent implements OnInit {
  @Input() blogPost: BlogPost;
  @Input() showAbstract: boolean;
  @Input() enableComments: boolean;
  @Input() showComments: boolean;
  @Output('show-comments') showCommentsEvent= new EventEmitter();

  constructor() {
    this.enableComments = true;
    this.showComments = true;
    this.showAbstract = false;
  }

  ngOnInit() {

  }

  toggleComments() {
    this.showComments = !this.showComments;
    this.showCommentsEvent.emit(this.showComments);
  }


}
