import { Component } from '@angular/core';
import { MdButton } from '@angular2-material/button';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { TagListComponent } from '../tag-list/tag-list.component';
import { BlogAbstractListComponent } from '../blog-list/blog-abstract-list.component';
import { BlogCreateComponent } from '../blog-create/blog-create.component';
import { BlogSummaryListComponent } from '../blog-summary-list/blog-summary-list.component';
import { SearchService } from '../shared/search.service';

@Component({
  selector: 'blog-home',
  template: require('./blog-home.component.html'),
  styles: [require('./blog-home.scss')],
  directives: [
    ROUTER_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdButton,
    TagListComponent,
    BlogAbstractListComponent,
    BlogCreateComponent,
    BlogSummaryListComponent
  ]
})
export class BlogHomeComponent {

  thirdLine: boolean = false;
  infoClicked: boolean = false;

  constructor (
    public searchService: SearchService,
    public router: Router) {

  }

}
