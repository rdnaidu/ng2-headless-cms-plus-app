import { RouterConfig } from '@angular/router';
import { NoContent } from './no-content';

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
import { AuthGuard } from './auth/auth-guard';

export const routes: RouterConfig = [
    { path: '',      component: HomeComponent },
    { path: 'home',  component: HomeComponent },
    { path: 'users',  component: UsersComponent , canActivate: [AuthGuard]},
    { path: 'users/:name/:id',  component: UserFormComponent },
    { path: 'users/new',  component: UserFormComponent },
    { path: 'blog/:id',  component: BlogComponent},
    { path: 'blog-user/:name/:id' , component: BlogUserComponent},
    { path: 'login', component: LoginComponent },
    { path: 'blog-form', component: BlogFormComponent , canActivate: [AuthGuard]},
    { path: 'blog-form/:id', component: BlogFormComponent , canActivate: [AuthGuard]},
    { path: 'blogusers', component: BlogUserListComponent },
    { path: 'omdb', component: OmdbComponent },
    { path: 'solr', component: SolrComponent },
    { path: 'notifications', component: NotificationsDemoComponent },
    // { path: '/contentful', component: ContentfulComponent },
    { path: 'settings', component: AppSettingsComponent },
    { path: 'about', component: 'About' },
    { path: '*other', redirectTo: '/home' }
];

// asyncRoutes is needed for our webpack-toolkit to allow us to resolve the component correctly
export const asyncRoutes = {
  'About': require('es6-promise-loader!./about')
};


