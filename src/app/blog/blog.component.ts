import { Component, OnInit } from '@angular/core';
import { MdButton } from '@angular2-material/button';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { RouteConfig, ROUTER_DIRECTIVES, Router, RouteParams } from '@angular/router-deprecated';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { SpinnerComponent } from '../shared/spinner.component';
import { BlogPost, BlogPostLive, Comments } from '../blog-list/blog';
import { BlogService } from '../blog-list/blog.service';
import { AuthService } from '../auth/auth.service';
import { CommentsComponent } from '../comments/comments.component';
import { BlogContentComponent } from '../blog-content/blog-content.component';
import { CommentsFormComponent } from '../comments/comments-form.component';

@Component({
  selector: 'blog-post',
  template: require('./blog.component.html'),
  directives: [
    ROUTER_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdButton,
    MD_CARD_DIRECTIVES,
    PAGINATION_DIRECTIVES,
    CommentsComponent,
    BlogContentComponent,
    CommentsFormComponent,
    SpinnerComponent
  ],
  styles: [require('./blog.component.scss')],
  providers: [BlogService]
})
export class BlogComponent implements OnInit {
  blogPost: BlogPostLive = <BlogPostLive>{};
  postLoading;
  blogServiceError = false;
  errorMessage;
  showComments: boolean;

  constructor(
    public auth: AuthService,
    private _service: BlogService,
    private _routeParams: RouteParams) {
    this.showComments = true;
  }

  ngOnInit() {
    let id = this._routeParams.get('id');
    console.log('id = ' + id);
    this.loadPost(id);
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  onShowComments(event) {
    //alert(event);
    this.showComments = event;
	//	var startIndex = (page -1) * this.pageSize;
	//	this.pagedPosts = _.take(_.drop(this.posts, startIndex), this.pageSize)
	}
  
  private loadPost(id: any) {

    this.postLoading = true; //
    this._service.getBlog(id)
      .subscribe(
      post => {

        this.blogPost = post;
        this.blogPost.postDate = new Date(this.blogPost.publishdate);
        this.blogPost.comment_count = _.size(this.blogPost.comments);
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
      },
      error => {
        this.blogServiceError = true;
        this.errorMessage = 'Unable able to connect';
        this.postLoading = false;
      },
      () => {
        this.postLoading = false;
      });
  }

}
