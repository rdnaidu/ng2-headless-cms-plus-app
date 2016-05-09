import {Component,ViewEncapsulation,OnInit} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {NavBarComponent} from '../nav-bar/navbar.component';
import {HomeComponent} from '../home/home.component';
import {UsersComponent} from '../users/users.component';
import {UserFormComponent} from '../users/user-form.component';
import {NotFoundComponent} from '../not-found/not-found.component';
import {LoginComponent} from '../login/login.component';
import {BlogComponent} from '../blog/blog.component';

import {DemoApp} from '../demo-app/demo-app';

declare var jQuery: any;


@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/users', name: 'Users', component: UsersComponent },
    { path: '/users/:id', name: 'EditUser', component: UserFormComponent },
    { path: '/users/new', name: 'NewUser', component: UserFormComponent },
    { path: '/blog/:id', name: 'Blog', component: BlogComponent},
    { path: '/login', name: 'Login', component: LoginComponent },
    { path: '/*other', name: 'Other', redirectTo: ['Home'] }
])
@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
     encapsulation: ViewEncapsulation.None,
    styles: [ require('assets/css/bootstrap.css'),
              require('assets/css/styles.css'),
              require('assets/bootstrap-material-design/css/bootstrap-material-design.min.css'),
              require('assets/bootstrap-material-design/css/ripples.min.css')
              ],
    directives: [ROUTER_DIRECTIVES, NavBarComponent]
})

export class AppComponent implements OnInit{
    
    ngOnInit(){
        jQuery.material.init();
    }
}