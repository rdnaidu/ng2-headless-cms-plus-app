import { Component, OnInit, SimpleChange, Input } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { BlogPost } from '../blog-list/blog';
import { SearchJSON } from '../blog-list/blog';
import { BlogService } from '../blog-list/blog.service';
import { SearchService } from '../shared/search.service';
// webpack html imports
let template = require('./blog-typeahead.html');

@Component({
  selector: 'blog-typeahead',
  providers: [BlogService],
  directives: [TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  styles: [require('./blog-typeahead.component.scss')],
  template: template
})
export class BlogTypeaheadComponent implements OnInit {
  public selected: string = '';
  public typeaheadLoading: boolean = false;
  public typeaheadNoResults: boolean = false;

  blogs: any[];
  pagedBlogs: any[];
  postsLoading;
  blogServiceError = false;
  errorMessage;
  changeLog: string[] = [];

  constructor(public searchService: SearchService,
    public router: Router,
    private _service: BlogService) {

  }

  getContext() {
    return this;
  }

  ngOnInit() {
    this.loadPosts();
  }

  clearSearch() {
    this.selected = '';
    this.searchService.searchJSON.title = '';
  }


  public typeaheadOnSelect(e: any): void {
    this.searchService.searchJSON.title = e.item.id;
    this.router.navigate(['/blog', e.item.id]);
  }

  private loadPosts() {
    this.postsLoading = true;
    this.typeaheadNoResults = false;
    this._service.getBlogs()
      .subscribe(
      blogs => {
        this.blogs = blogs;
      },
      error => {
        this.blogServiceError = true;
        this.errorMessage = 'Unable to connect';
        this.postsLoading = false;
        this.typeaheadNoResults = true;
      },
      () => {
        this.postsLoading = false;
      });
  }
}
