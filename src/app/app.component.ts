/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, OnInit, Inject, provide } from '@angular/core';
import { Router, RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { NavBarComponent } from './nav-bar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';
import { BlogUserComponent } from './blog-user/blog-user.component';
import { BlogFormComponent } from './blog-create/blog-form.component';
import { BlogUserListComponent } from './blog-user-list/blog-user-list.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { OmdbComponent } from './omdb/omdb.component';

import { NotificationsDemoComponent }
        from './library/notifications-demo/notifications-demo.component';
import { AppState } from './app.service';
import { RouterActive } from './router-active';
import { APP_CONFIG, CONFIG, Config } from './app.config';
import { SimpleNotificationsComponent } from 'angular2-notifications';
// import { ContentfulComponent } from './contentful/contentful.component';

declare var jQuery: any;

/*
 * App Component
 * Top Level Component
 */
@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/users', name: 'Users', component: UsersComponent },
    { path: '/users/:name/:id', name: 'EditUser', component: UserFormComponent },
    { path: '/users/new', name: 'NewUser', component: UserFormComponent },
    { path: '/blog/:id', name: 'Blog', component: BlogComponent},
    { path: '/blog-user/:name/:id' , name: 'BlogUser', component: BlogUserComponent},
    { path: '/login', name: 'Login', component: LoginComponent },
    { path: '/blog-form/', name: 'NewBlog', component: BlogFormComponent},
    { path: '/blog-form/:id', name: 'EditBlog', component: BlogFormComponent},
    { path: '/blogusers', name: 'BlogUserList', component: BlogUserListComponent },
    { path: '/omdb', name: 'Omdb', component: OmdbComponent },
    { path: '/notifications', name: 'Notifications', component: NotificationsDemoComponent },
    // { path: '/contentful', name: 'Contentful', component: ContentfulComponent },
    // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
    { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') },
    { path: '/settings', name: 'Settings', component: AppSettingsComponent },
    { path: '/*other', name: 'Other', redirectTo: ['Home'] }
])
@Component({
    selector: 'app',
    template: require('./app.component.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [ require('assets/css/bootstrap.css'),
              require('assets/css/styles.css'),
              require('bootstrap-material-design/dist/css/bootstrap-material-design.min.css'),
              require('bootstrap-material-design/dist/css/ripples.min.css')
              ],
    directives: [ROUTER_DIRECTIVES, NavBarComponent, RouterActive, SimpleNotificationsComponent]
})
// TODO: Keep track of this issue for back button on IE11
// https://github.com/angular/angular/issues/7873
export class AppComponent implements OnInit {

    notificationsOptions = {
        timeOut: 3000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false
    };

    constructor (
        @Inject(APP_CONFIG) private config: Config,
        public appState: AppState,
        public router: Router) {

    }
    ngOnInit() {
        console.log(this.config);
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
