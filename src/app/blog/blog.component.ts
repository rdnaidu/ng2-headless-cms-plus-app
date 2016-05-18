import { Component, OnInit } from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router, RouteParams} from '@angular/router-deprecated';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {LikeComponent} from '../shared/like.component';

import {BlogPost, Comments} from '../blog-list/blog';
import {BlogService} from '../blog-list/blog.service';
import {AuthService} from '../auth/auth.service';
import {DateDeltaPipe} from './date-delta.pipe';

@Component({
  selector: 'blog-post',
  template: require('./blog.component.html'),
  directives: [
    ROUTER_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdButton,
    MD_CARD_DIRECTIVES,
    PAGINATION_DIRECTIVES,
    LikeComponent
  ],
  styles: [require('./blog.component.scss')],
  providers: [BlogService],
  pipes: [DateDeltaPipe]
})
export class BlogComponent implements OnInit {
  blogPost = new BlogPost();
  postLoading;
  blogServiceError = false;
  errorMessage;

  constructor(
    public auth: AuthService,
    private _service: BlogService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = this._routeParams.get('id');
    console.log('id = ' + id);
    this.loadPost(id);
  }


  private loadPost(id: any) {

    this.postLoading = true; //
    this._service.getBlog(id)
      .subscribe(
      post => {

        this.blogPost = <BlogPost> post;
        this.blogPost.postDate = new Date(this.blogPost.publishedDate);
        this.blogPost.commentsCount = _.size(this.blogPost.comments);
        _.map(this.blogPost.comments, function addDate(data: Comments) {
					data.commentDt = new Date(data.commentDate);
				});
        this.blogPost.comments = _.sortBy(this.blogPost.comments, 'commentDt').reverse();
        this.blogPost.tagStr = (this.blogPost.tags.join(','));
        if (_.size(this.blogPost.images) > 0) {
          this.blogPost.currentImage = this.blogPost.images[0];
        } else {
          this.blogPost.currentImage = '';
        }
     //   console.log(this.blogPost);
      },
      error => {
        this.blogServiceError = true;
        this.errorMessage = 'Unable able to connect';
        this.postLoading = false;
        // console.log(this.errorMessage);
      },
      () => {
        this.postLoading = false;
      });
  }

}
