/*
 * Providers provided by Angular
 */
import { bootstrap } from '@angular/platform-browser-dynamic';
/*
* Platform and Environment
* our providers/directives/pipes
*/
import { PLATFORM_PROVIDERS } from './platform/browser';
import { ENV_PROVIDERS } from './platform/environment';

/*
* App Component
* our top level component that holds all of our components
*/
import { AppComponent, APP_PROVIDERS } from './app';


import { FORM_PROVIDERS, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ComponentRef } from '@angular/core/index';
// Angular 2 Http
import { HTTP_PROVIDERS, Http } from '@angular/http';
// Angular 2 Router
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { PLATFORM_DIRECTIVES, provide } from '@angular/core';

import { appInjectorRef } from './app/shared/appInjectorRef';
import { AuthService } from './app/auth/auth.service';
import { SearchService } from './app/shared/search.service';
import { SettingsService } from './app/shared/settings.service';
import { TRANSLATE_PROVIDERS,
        TranslateService,
        TranslatePipe,
        TranslateLoader,
        TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { APP_CONFIG, CONFIG, Config } from './app/app.config';
import { SessionService } from './app/shared/services/session.service';
import { HelperService } from './app/shared/services/helper.service';
import { BasicAuth } from './app/auth/auth-user';
import { UserService } from './app/users/user.service';
import { NotificationsService } from 'angular2-notifications';
import { SolrService } from './app/solr/solr.service';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(initialHmrState?: any): Promise<any> {

  return bootstrap(AppComponent, [
    SolrService,
    NotificationsService,
    BasicAuth,
    UserService,
    AuthService,
    SearchService,
    SessionService,
    SettingsService,
    HelperService,
    ...PLATFORM_PROVIDERS,
    ...ENV_PROVIDERS,
    ...APP_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    { provide: TranslateLoader,
        useFactory: (http: any) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http]
    },
     {provide: LocationStrategy, useClass: PathLocationStrategy  },
    TranslateService,
    provide(APP_CONFIG, { useValue: CONFIG })
  ]).then((appRef: any) => {
        // store a reference to the application injector
        appInjectorRef(appRef.injector);
    }).catch(err => console.error(err));

}

/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * You can also import them in vendors to ensure that they are bundled in one file
 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === ENV && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when document is ready
  document.addEventListener('DOMContentLoaded', () => main());
}

