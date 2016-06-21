import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { MdButton } from '@angular2-material/button';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { TagListService } from './tag-list.service';
import { SearchService } from '../shared/search.service';
import { SearchJSON } from '../blog-list/blog';
import { Tag } from './tag';

@Component({
  selector: 'tag-list',
  template: require('./tag-list.component.html'),
  styles: [require('./tag-list.component.scss')],
  directives: [
    ROUTER_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_GRID_LIST_DIRECTIVES,
    TYPEAHEAD_DIRECTIVES,
    MdButton],
  providers: [TagListService]
})
export class TagListComponent implements OnInit {
  tags: Tag[] = [] as Tag[];
  allTags: Tag[] = [] as Tag[];
  tagsLoading: boolean = true;
  tagsServiceError = false;
  errorMessage;
  selected: string = '';

  constructor(
    public searchService: SearchService,
    private _service: TagListService) { }

  ngOnInit() {
    this.loadTags();
  }

  public typeaheadOnSelect(e: any): void {
    console.log('event', e);
    this.searchService.searchJSON.tag = e.item.name;
  }

  clearSearch() {
    this.selected = '';
    this.searchService.clearSearch();
  }

  setSearch(tag: Tag) {
    this.searchService.clearTitle();
    this.searchService.searchJSON.tag = tag.name;
  }

  private loadTags(): void {
    this.tagsLoading = true;
    this._service.getTags()
      .subscribe(
      tags => {
        this.allTags = tags;
        this.tags = _.take(_.sortBy(tags, 'count').reverse(), 20);
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
