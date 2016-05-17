import {Component} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

import {TagListService} from './tag-list.service';
import {Tag} from './tag';

@Component({
  selector: 'tag-list',
  template: require('./tag-list.component.html'),
  directives: [ROUTER_DIRECTIVES, MD_LIST_DIRECTIVES, MdButton],
  providers: [TagListService]
})
export class TagListComponent {
  tags: any[];
  tagsLoading;
  tagsServiceError = false;
  errorMessage;

  constructor(private _service: TagListService) { }

  ngOnInit() {
    this.loadTags();
  }

  private loadTags(): void {
    this.tagsLoading = true;
    this._service.getTags()
      .subscribe(
      tags => {
     //   this.tags = tags;
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
