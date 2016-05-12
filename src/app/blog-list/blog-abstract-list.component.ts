import {Component} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

import {BlogPaginationComponent} from './blog-pagination.component';


@Component({
  selector: 'blog-abstract-list',
  template: require('./blog-abstract-list.component.html'),
  directives: [ROUTER_DIRECTIVES, MD_LIST_DIRECTIVES, MdButton, BlogPaginationComponent]
})
export class BlogAbstractListComponent {
}
