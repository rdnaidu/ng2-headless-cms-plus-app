import {Component, OnInit} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

import {BlogPaginationComponent} from './blog-pagination.component';

import {BlogSummary} from './blog';
import {BlogService} from './blog.service';

@Component({
  selector: 'blog-abstract-list',
  template: require('./blog-abstract-list.component.html'),
  providers: [BlogService],
  directives: [ROUTER_DIRECTIVES, MD_LIST_DIRECTIVES, MdButton, BlogPaginationComponent]
})
export class BlogAbstractListComponent implements OnInit {

  blogs: any[];
  olderBlogs: any[];
  isLoading = true;
  blogServiceError = false;
  errorMessage;
  today = new Date();
  constructor(private _service: BlogService) {

  }

  ngOnInit() {
    this._service.getBlogs()
      .subscribe(
      blogs => {
        this.blogs = _.take(blogs, 5);
        this.olderBlogs = _.take(_.drop(blogs, 4), 10);
      },
      error => {
        this.blogServiceError = true;
        this.errorMessage = 'Unable able to connect';
        this.isLoading = false;
        // console.log("EEEE");
      },
      () => {
        this.isLoading = false;
      });
  }
}
