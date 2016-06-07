import {Component, OnInit, OnChanges, SimpleChange, Input} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import { SpinnerComponent } from '../shared/spinner.component';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {LikeComponent} from '../shared/like.component';
import {BlogContentComponent} from '../blog-content/blog-content.component';

import {BlogPost} from './blog';
import { BlogPostLive } from './blog';
import {SearchJSON} from './blog';
import {BlogService} from './blog.service';
import {SearchService} from '../shared/search.service';

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
    LikeComponent,
    BlogContentComponent,
    SpinnerComponent
  ]
})
export class BlogAbstractListComponent implements OnInit, OnChanges {
  post = postValue;
  blogs: any[];
  pagedBlogs: any[];
  postsLoading;
  blogServiceError = false;
  errorMessage;
  changeLog: string[] = [];
  showComments: boolean;
  @Input() searchString: string;

  // Pagination related settings
  // Todo: Need to move to a global place for this type of settings
  public totalItems: number = 100;
  public currentPage: number = 1;
  public maxSize: number = 5;
  public itemsPerPage: number = 5;
  public currentSearch: SearchJSON = <SearchJSON>{};
  constructor(public searchService: SearchService,
    private _service: BlogService) {
    this.showComments = false;
  }

  ngOnInit() {
    this.loadPosts();
    /*this._service.createBlog()
      .subscribe(data => {
        console.log('blog created', data);
      });*/
  }
  
  loadPosts() {
    let self = this;
    this.postsLoading = true;
    this.currentPage = 1;
    this._service.getBlogs()
      .map(data => {
        let tData = _.filter(data, function(o: BlogPost) {
          if (self.searchService.searchJSON.tag == '') {
            return true;
          }
          
          let index = _.indexOf(o.tags, self.searchService.searchJSON.tag);
          
          if (index === -1) return false;
          
          return true;
        });
        
        console.log(tData);
        return tData;
      })
      .subscribe(
      blogs => {
        this.blogs = blogs;
        this.totalItems = _.size(this.blogs);
        this.pagedBlogs = _.take(this.blogs, this.itemsPerPage);
        _.map(this.pagedBlogs, function addDate(data: BlogPostLive) {
          data.postDate = new Date(data.publishdate);
          data.tagStr = (data.tags.join(','));
          if (_.size(data.images) > 0) {
            data.currentImage = data.images[0];
          } else {
            data.currentImage = '';
          }
        });
      },
      error => {
        this.blogServiceError = true;
        this.errorMessage = 'Unable able to connect';
        this.postsLoading = false;
      },
      () => {
        this.postsLoading = false;
      });
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    for (let propName in changes) {
      if (propName === 'searchString') {
        this.loadPosts();
      }
    }
  }

  clearSearch(type: string) {
    this.searchService.clearSearch();
    this.loadPosts();
  }

  public pageChanged(event: any): void {
    let startIndex = (event.page - 1) * this.itemsPerPage;
    this.pagedBlogs = _.take(_.drop(this.blogs, startIndex), this.itemsPerPage);
    
    _.map(this.pagedBlogs, function addDate(data: BlogPostLive) {
      data.postDate = new Date(data.publishdate);
      data.comment_count = data.comment_count;
      data.tagStr = (data.tags.join(','));
      if (_.size(data.images) > 0) {
        data.currentImage = data.images[0];
      } else {
        data.currentImage = '';
      }
      
    });
  };

  private loadSearch() {
    this.postsLoading = true;
    this._service.getBlogs()
      .subscribe(
      blogs => {
        
        this.blogs = _.take(_.drop(blogs, Math.round(Math.random() * 10) + 1), this.itemsPerPage);
        this.totalItems = _.size(this.blogs);
        
        this.pagedBlogs = _.take(this.blogs, this.itemsPerPage);
        _.map(this.pagedBlogs, function addDate(data: BlogPost) {
          data.postDate = new Date(data.publishdate);
          data.comment_count = data.comment_count;
          data.tagStr = (data.tags.join(','));
          if (_.size(data.images) > 0) {
            data.currentImage = data.images[0];
          } else {
            data.currentImage = '';
          }
        });
      },
      error => {
        this.blogServiceError = true;
        this.errorMessage = 'Unable able to connect';
        this.postsLoading = false;
      },
      () => {
        this.postsLoading = false;
      });
  }
}
