import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
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
import { CanDeactivateGuard }    from './shared/interfaces';

export const routes: RouterConfig = [
    { path: '',      component: HomeComponent },
    { path: 'home',  component: HomeComponent },
    { path: 'users',  component: UsersComponent , canActivate: [AuthGuard]},
    { path: 'users/:name/:id',  component: UserFormComponent },
    { path: 'users/new',  component: UserFormComponent },
    { path: 'blog/:id',  component: BlogComponent},
    { path: 'blog-user/:name/:id' , component: BlogUserComponent},
    { path: 'login', component: LoginComponent },
    { path: 'blog-form',
            component: BlogFormComponent ,
            canActivate: [AuthGuard],
            canDeactivate: [CanDeactivateGuard]
          },
    { path: 'blog-form/:id', component: BlogFormComponent , canActivate: [AuthGuard]},
    { path: 'blogusers', component: BlogUserListComponent },
    { path: 'omdb', component: OmdbComponent },
    { path: 'solr', component: SolrComponent },
    { path: 'notifications', component: NotificationsDemoComponent },
    // { path: '/contentful', component: ContentfulComponent },
    { path: 'settings', component: AppSettingsComponent },
    // make sure you match the component type string to the require in asyncRoutes
    { path: 'about', component: 'About' },
    // async components with children routes must use WebpackAsyncRoute
    { path: 'detail', component: 'Detail', canActivate: [ WebpackAsyncRoute ] },
    { path: '**',    component: NoContent },
    { path: '*other', redirectTo: '/home' }
];

// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly

export const asyncRoutes: AsyncRoutes = {
  // we have to use the alternative syntax for es6-promise-loader to grab the routes
  'About': require('es6-promise-loader!./about'),
  'Detail': require('es6-promise-loader!./+detail'),
};


// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
export const prefetchRouteCallbacks: Array<IdleCallbacks> = [
  asyncRoutes['About'],
  asyncRoutes['Detail']
   // es6-promise-loader returns a function
];


// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings

