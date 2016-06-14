import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ROUTER_DIRECTIVES, RouteParams, RouteConfig } from '@angular/router-deprecated';
import { GitUserDetailComponent } from './gitUserDetail.component';
import { GitUserFollowersComponent } from './gitUserFollowers.component';

@Component({
  template: `
    <div class="panel panel-default" *ngIf="userLogin != null">
      <div class="panel-heading">
        <h1> {{userLogin}}</h1>
      </div>
      <div class="panel-body">
        <router-outlet></router-outlet>
      <div>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
     { path: '/detail/...', name: 'GitUsers', component: GitUserDetailComponent, useAsDefault: true}
])
export class GitUsersComponent {
  userLogin: Object;

  constructor(params: RouteParams) {
    this.userLogin = params.get('userLogin');
  }
}
