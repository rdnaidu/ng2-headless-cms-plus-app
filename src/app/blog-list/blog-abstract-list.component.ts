import {Component, OnInit} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {LikeComponent} from '../shared/like.component';

import {BlogPost} from './blog';
import {BlogService} from './blog.service';

import * as _ from 'lodash';

const postValue = '<p>So the stars of <del>The Avengers 2.5</del> Captain America</p>';

@Component({
  selector: 'blog-abstract-list',
  template: require('./blog-abstract-list.component.html'),
  providers: [BlogService],
  styles: [require('./blog-abstract-list.scss')],
  directives: [
    ROUTER_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdButton,
    MD_CARD_DIRECTIVES,
    PAGINATION_DIRECTIVES,
    LikeComponent
  ]
})
export class BlogAbstractListComponent implements OnInit {
  post = postValue;
  blogs: any[];
  pagedBlogs: any[];
  postsLoading;
  blogServiceError = false;
  errorMessage;


  public totalItems: number = 100;
  public currentPage: number = 1;
  public maxSize: number = 5;
  public itemsPerPage: number = 5;

  constructor(private _service: BlogService) {

  }

  ngOnInit() {
    this.loadPosts();
  }

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    let startIndex = (event.page - 1) * this.maxSize;
    this.pagedBlogs = _.take(_.drop(this.blogs, startIndex), this.maxSize);
     _.map(this.pagedBlogs, function addDate(data: BlogPost) {
          data.postDate = new Date(data.publishedDate);
          data.commentsCount = _.size(data.comments);
          data.tagStr = (data.tags.join(','));
          if (_.size(data.images) > 0) {
            data.currentImage = data.images[0];
          } else {
            data.currentImage = '';
          }
          // console.log(data.likes);

        });
  };

  private loadPosts() {
    this.postsLoading = true;
    this._service.getBlogs()
      .subscribe(
      blogs => {
        this.blogs = blogs;
        this.totalItems = _.size(this.blogs);
        console.log(this.totalItems);
        this.pagedBlogs = _.take(this.blogs, this.maxSize);
        _.map(this.pagedBlogs, function addDate(data: BlogPost) {
          data.postDate = new Date(data.publishedDate);
          data.commentsCount = _.size(data.comments);
          data.tagStr = (data.tags.join(','));
          if (_.size(data.images) > 0) {
            data.currentImage = data.images[0];
          } else {
            data.currentImage = '';
          }
          // console.log(data.likes);

        });
      },
      error => {
        this.blogServiceError = true;
        this.errorMessage = 'Unable able to connect';
        this.postsLoading = false;
        // console.log("EEEE");
      },
      () => {
        this.postsLoading = false;
      });
  }



}
