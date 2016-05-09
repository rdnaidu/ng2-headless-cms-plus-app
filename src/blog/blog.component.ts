import {Component} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

@Component({
  selector: 'list-demo',
  template: require('./blog.component.html'),
  directives: [ROUTER_DIRECTIVES,MD_LIST_DIRECTIVES, MdButton],
  styles: [ require('assets/css/blog.css')]
})
export class BlogComponent {
}