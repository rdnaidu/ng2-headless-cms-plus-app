import { Component } from '@angular/core';
import { MdButton } from '@angular2-material/button';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { RouteConfig, ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { CanActivate,
         CanDeactivate,
         RouteParams,
         ComponentInstruction } from '@angular/router-deprecated';
import { isLoggedIn } from '../auth/isLoggedIn';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'blog-create',
  template: require('./blog-create.component.html'),
  directives: [ROUTER_DIRECTIVES, MD_LIST_DIRECTIVES, MdButton]
})
@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
  return isLoggedIn(next, previous);
})
export class BlogCreateComponent {

    constructor(
                public auth: AuthService,
                private _router: Router) {
    }

}
