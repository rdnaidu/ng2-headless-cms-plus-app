import {Component, Input, OnInit , OnChanges, SimpleChange} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

import {TagListService} from './tag-list.service';
import {SearchService} from '../shared/search.service';
import {SearchJSON} from '../blog-list/blog';
import {Tag} from './tag';

@Component({
  selector: 'tag-list',
  template: require('./tag-list.component.html'),
  styles: [require('./tag-list.component.scss')],
  directives: [
    ROUTER_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    TYPEAHEAD_DIRECTIVES,
    MdButton],
  providers: [TagListService]
})
export class TagListComponent implements OnInit, OnChanges {
  tags: any[];
  allTags: any[];
  tagsLoading;
  tagsServiceError = false;
  errorMessage;
  selected: string = '';
  @Input() searchString: string;
  currentSearch: SearchJSON;


  constructor(public searchService: SearchService,
    private _service: TagListService) { }

  ngOnInit() {
    this.loadTags();
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

    for (let propName in changes) {
      if (propName === 'searchString') {
        let chng = changes[propName];
        this.currentSearch = chng.currentValue;

        //   let prev = JSON.stringify(chng.previousValue);
        //   let changeStr = `${propName}: currentValue = ${cur}, previousValue = ${prev}`;
        //    this.changeLog.push(changeStr);
        // console.log(this.searchString);
      }
      if (this.currentSearch !== undefined) {
        this.selected = this.currentSearch.searchText;
      }
    }
  }

  public typeaheadOnSelect($e: Event): void {
    // console.log($e.item.tag);
    ///let searchObj = new Search();
    //  searchObj.
    this.searchService.searchJSON = this.encodeSearch($e.item.tag);
  }

  clearSearch() {
    // alert('hellop');
    this.selected = '';
    this.searchService.searchJSON = this.encodeSearch('');
  }

  setSearch(tag: Tag) {
   // alert(tag.tag);
    this.searchService.searchJSON = this.encodeSearch(tag.tag);
  }

  private encodeSearch(searchText: string): SearchJSON {
    return {
      type: 'tagSearch',
      searchText: searchText
    };
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
