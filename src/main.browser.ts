/*
 * Providers provided by Angular
 */
import {bootstrap} from '@angular/platform-browser-dynamic';
/*
* Platform and Environment
* our providers/directives/pipes
*/
import {DIRECTIVES, PIPES, PROVIDERS} from './platform/browser';
import {ENV_PROVIDERS} from './platform/environment';

/*
* App Component
* our top level component that holds all of our components
*/
//import {App, APP_PROVIDERS} from './app';


import {FORM_PROVIDERS, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {ComponentRef} from '@angular/core/index';
// Angular 2 Http
import {HTTP_PROVIDERS, Http} from '@angular/http';
// Angular 2 Router
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {PLATFORM_DIRECTIVES} from '@angular/core'; 

import {AppComponent} from './my-app/app.component';
import {appInjectorRef} from './shared/appInjectorRef';
import {AuthService} from './auth/auth.service';
import {TRANSLATE_PROVIDERS,
        TranslateService,
        TranslatePipe,
        TranslateLoader,
        TranslateStaticLoader} from 'ng2-translate/ng2-translate';
        
/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(initialHmrState?: any): Promise<any> {

  return bootstrap(AppComponent, [
    AuthService,
    ...PROVIDERS,
    ...ENV_PROVIDERS,
    ...DIRECTIVES,
    ...PIPES,
 //   ...APP_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    { provide: TranslateLoader, 
        useFactory: (http: any) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http]
    },
     {provide: LocationStrategy, useClass: PathLocationStrategy  },
    TranslateService,
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
  // bootstrap when documetn is ready
  document.addEventListener('DOMContentLoaded', () => main());
}

