/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {NavBarComponent} from './nav-bar/navbar.component';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {UserFormComponent} from './users/user-form.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {BlogComponent} from './blog/blog.component';
import {BlogUserComponent} from './blog-user/blog-user.component';

import {AppState} from './app.service';
import {RouterActive} from './router-active';


declare var jQuery: any;

/*
 * App Component
 * Top Level Component
 */
@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/users', name: 'Users', component: UsersComponent },
    { path: '/users/:id', name: 'EditUser', component: UserFormComponent },
    { path: '/users/new', name: 'NewUser', component: UserFormComponent },
    { path: '/blog/:id', name: 'Blog', component: BlogComponent},
    { path: '/blog-user/:id' , name: 'BlogUser', component: BlogUserComponent},
    { path: '/login', name: 'Login', component: LoginComponent },
    { path: '/*other', name: 'Other', redirectTo: ['Home'] },
    // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
    { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') }
])
@Component({
    selector: 'app',
    template: require('./app.component.html'),
     encapsulation: ViewEncapsulation.None,
    styles: [ require('assets/css/bootstrap.css'),
              require('assets/css/styles.css'),
              require('assets/bootstrap-material-design/css/bootstrap-material-design.min.css'),
              require('assets/bootstrap-material-design/css/ripples.min.css')
              ],
    directives: [ROUTER_DIRECTIVES, NavBarComponent, RouterActive]
})

export class AppComponent implements OnInit {
    constructor (
    public appState: AppState,
    public router: Router) {

  }
    ngOnInit() {
        jQuery.material.options.validate = false;
        jQuery.material.init();
        console.log('Initial App State', this.appState.state);
    }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
