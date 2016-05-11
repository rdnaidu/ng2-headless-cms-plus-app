import {Component} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';


@Component({
  selector: 'blog-list',
  template: require('./blog-list.component.html')
})
export class BlogListComponent {
}
