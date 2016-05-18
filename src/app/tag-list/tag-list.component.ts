import {Component} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

import {TagListService} from './tag-list.service';
import {SearchService} from '../shared/search.service';
import {Search} from '../blog-list/blog';
import {Tag} from './tag';

@Component({
  selector: 'tag-list',
  template: require('./tag-list.component.html'),
  directives: [
    ROUTER_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    TYPEAHEAD_DIRECTIVES,
    MdButton],
  providers: [TagListService]
})
export class TagListComponent {
  tags: any[];
  allTags: any[];
  tagsLoading;
  tagsServiceError = false;
  errorMessage;
  selected: string = '';


  constructor(public searchService: SearchService,
              private _service: TagListService) { }

  ngOnInit() {
    this.loadTags();
  }

  public typeaheadOnSelect($e: Event): void {
    //console.log($e.item.tag);
   /// let searchObj = new Search();
  //  searchObj.
    this.searchService.searchText = 'Tag Search: ' + $e.item.tag;
  }

  private loadTags(): void {
    this.tagsLoading = true;
    this._service.getTags()
      .subscribe(
      tags => {
        this.allTags = tags;
        this.tags = _.take(_.sortBy(tags, 'count').reverse(), 20);
        //   console.log(this.tags);
      },
      error => {
        this.tagsServiceError = true;
        this.errorMessage = 'Unable able to connect';
        this.tagsLoading = false;
      },
      () => {
        this.tagsLoading = false;
      });
  }



}
