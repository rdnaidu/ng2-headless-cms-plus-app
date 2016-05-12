import {Component} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

@Component({
  selector: 'blog-create',
  template: require('./blog-create.component.html'),
  directives: [ROUTER_DIRECTIVES, MD_LIST_DIRECTIVES, MdButton]
})
export class BlogCreateComponent {

}
