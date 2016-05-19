import {Component, OnInit, OnChanges, SimpleChange, Input} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';


import {BlogPost} from '../blog-list/blog';
import {SearchJSON} from '../blog-list/blog';
import {BlogService} from '../blog-list/blog.service';
import {SearchService} from '../shared/search.service';
// webpack html imports
let template = require('./blog-typeahead.html');

@Component({
  selector: 'blog-typeahead',
  providers: [BlogService],
  directives: [TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  styles: [require('./blog-typeahead.component.scss')],
  template: template
})
export class BlogTypeaheadComponent implements OnInit, OnChanges {
  public selected: string = '';
  //  public asyncSelected: string = '';
  public typeaheadLoading: boolean = false;
  public typeaheadNoResults: boolean = false;

  blogs: any[];
  pagedBlogs: any[];
  postsLoading;
  blogServiceError = false;
  errorMessage;
  @Input() searchString: SearchJSON;
  changeLog: string[] = [];
  currentSearch: SearchJSON;

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

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

    for (let propName in changes) {
      if (propName === 'searchString') {
        let chng = changes[propName];
        this.currentSearch = chng.currentValue;
        //   let prev = JSON.stringify(chng.previousValue);
        //   let changeStr = `${propName}: currentValue = ${cur}, previousValue = ${prev}`;
        //    this.changeLog.push(changeStr);
        console.log(this.currentSearch);
      }

      //   console.log(changeStr);
    }
    // simulating search text change
    if (this.currentSearch !== undefined && this.currentSearch.type === 'titleSearch') {

      this.selected = this.currentSearch.searchText;
      console.log("Modified" + this.selected);
    }

  }


  clearSearch() {
    // alert('hellop');
    this.selected = '';
    this.searchService.searchJSON = this.encodeSearch('');
  }


  public typeaheadOnSelect(e: any): void {
    // console.log(`Selected value: ${e.item.id}`);
    let blogId = `${e.item.id}`;
    this.searchService.setSearchJSON(this.encodeSearch(''));
    this.router.navigate(['Blog', { id: blogId }]);
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
        this.errorMessage = 'Unable able to connect';
        this.postsLoading = false;
        this.typeaheadNoResults = true;
      },
      () => {
        this.postsLoading = false;
      });
  }

  private encodeSearch(searchText: string): SearchJSON {
    return {
      type: 'titleSearch',
      searchText: searchText
    };
  }

}
