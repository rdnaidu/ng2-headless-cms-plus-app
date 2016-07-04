/*
 * Angular 2 decorators and services
 */

import { Component,
        ViewEncapsulation,
        OnInit,
        Inject,
        provide,
        ViewContainerRef  } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
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
import { SolrComponent } from './solr/solr.component';


import { NotificationsDemoComponent }
        from './library/notifications-demo/notifications-demo.component';
import { AppState } from './app.service';
import { APP_CONFIG, CONFIG, Config } from './app.config';
import { SimpleNotificationsComponent } from 'angular2-notifications';
// import { ContentfulComponent } from './contentful/contentful.component';
import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap';


declare var jQuery: any;



/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    viewProviders: [ ...BS_MODAL_PROVIDERS ],
    encapsulation: ViewEncapsulation.None,
    styles: [
              require('assets/css/bootstrap.css'),
              require('assets/css/styles.css'),
              require('bootstrap-material-design/dist/css/bootstrap-material-design.min.css'),
              require('bootstrap-material-design/dist/css/ripples.min.css'),
              require('ng2-select/components/css/ng2-select.css'),
              require('./app.style.css'),
              ],
    directives: [ROUTER_DIRECTIVES, NavBarComponent, SimpleNotificationsComponent]
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
        public modal: Modal,
        viewContainer: ViewContainerRef
        ) {
            //  all ancestors of our root component have access to Modal via DI
            modal.defaultViewContainer = viewContainer;
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
