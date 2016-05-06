import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouteConfig, Router} from '@angular/router-deprecated';
import {FORM_PROVIDERS, FORM_DIRECTIVES, Control} from '@angular/common';
import {Http} from '@angular/http';
import {GitUsersComponent} from './gitUsers.component';
import {GitUsersInfo} from './gitUser';
/*
    Inspired from 
    https://auth0.com/blog/2016/01/25/angular-2-series-part-4-component-router-in-depth/
*/
@Component({
  selector: 'git-explorer',
  providers: [ FORM_PROVIDERS ],
  directives: [ ROUTER_DIRECTIVES, FORM_DIRECTIVES ],
  pipes: [],
  template: require('./gitExplorer.component.html'),
  styles: [require('assets/css/GitExplorer.css')]
 // styleUrls: ['assets/stylesheets/gitExplorer.css']
})
@RouteConfig([
     { path: '/users/...', name: 'GitUsers', component: GitUsersComponent, useAsDefault: true}
])
export class GitExplorerComponent {
  users: Array<GitUsersInfo> = [];
  searchTerm: Control = new Control();

  constructor(public http: Http) {}

  getUsers() {
    this.http.get(`https://api.github.com/search/users?q=${this.searchTerm.value}`)
    .map(response => response.json())
    .subscribe(
      data => this.users = data,
      error => console.log(error)
    );
  }
}
