import { provide, ViewContainerRef } from '@angular/core';
import {
  beforeEach,
  beforeEachProviders,
  inject,
  it
} from '@angular/core/testing';

import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalRenderer, ModalBackdropComponent } from 'angular2-modal/models/tokens';

import { AppComponent } from './app.component';
import { AppState } from './app.service';
import { APP_CONFIG, CONFIG, Config } from './app.config';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    ModalRenderer,
    ModalBackdropComponent,
    { provide: APP_CONFIG, useValue: CONFIG },
    AppState,
    Modal,
    ViewContainerRef,
    AppComponent
  ]);

  it('should be defined', inject([AppComponent], (app) => {
    expect(app).toBeDefined();
  }));

  it('should have notifications options', inject([AppComponent], (app) => {
    let notificationsOptions = {
        timeOut: 3000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false
    };
    expect(app.notificationsOptions).toEqual(notificationsOptions);
  }));
});
