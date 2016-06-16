import {
  MockApplicationRef,
  beforeEach,
  beforeEachProviders,
  inject,
  injectAsync,
  it,
  describe,
  expect
} from '@angular/core/testing';

import { AppComponent } from './app.component';

// TODO: Need to investigate further to write test case for a component 
// which takes router as constructor argument.
/*
import {ApplicationRef} from 'angular2/core';
import { SpyLocation } from '@angular/common/testing';
import {RootRouter} from 'angular2/src/router/router';
import { Location, APP_BASE_HREF } from '@angular/common'
// Load the implementations that should be tested
import { provide, Inject } from '@angular/core';
import { 
  Router, 
  RouteRegistry, 
  ROUTER_PRIMARY_COMPONENT, 
  RouteConfig, ROUTER_DIRECTIVES 
} from '@angular/router-deprecated';

import { AppState } from './app.service';
import { APP_CONFIG, CONFIG, Config } from './app.config';

describe('App', () => {
  let config: Config;
  let route: Router;
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    route = jasmine.createSpyObj("Router", ['navigate']);
  });
    
  beforeEachProviders(() => [
    provide(APP_CONFIG, {useValue: CONFIG}),
    AppState,
    RouteRegistry,
    Location,
		provide(Router, {useClass: RootRouter}),
		provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
    AppComponent
  ]);

  it('should have a url', inject([ AppComponent ], (app) => {
    expect(app.url).toEqual('https://twitter.com/AngularClass');
  }));

});
*/

import { provide } from '@angular/core';
import { RootRouter } from 'angular2/src/router/router';
import { Router, ROUTER_PROVIDERS, RouteRegistry } from '@angular/router-deprecated';
import { AppState } from './app.service';
import { APP_CONFIG, CONFIG, Config } from './app.config';

describe('app component', () => {
    let component: AppComponent;
    let router: any;
    beforeEach(() => {
        // router = jasmine.createSpyObj('Router', ['navigate']);
        router = provide(Router, {useClass: RootRouter});
        component = new AppComponent(
          CONFIG,
          new AppState(),
          router
        );
    });

    it('should be defined', () => {
        expect(component).toBeDefined();
    });

    it('should have notifications options', () => {
      let notificationsOptions = {
          timeOut: 3000,
          showProgressBar: false,
          pauseOnHover: false,
          clickToClose: false
      };
      expect(component.notificationsOptions).toEqual(notificationsOptions);
    });
});
