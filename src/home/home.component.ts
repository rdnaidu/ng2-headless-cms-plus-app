import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {TranslateService, TranslatePipe, TRANSLATE_PROVIDERS} from 'ng2-translate/ng2-translate';

import {TranslateDemoComponent} from '../translate-demo/translate-demo.component';

import {GoogleMapsDemoComponent} from '../google-maps-demo/google-maps-demo.component';

import {NotificationsDemoComponent} from '../notifications-demo/notifications-demo.component';
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

@Component({
	selector: 'my-home',
	directives: [GoogleMapsDemoComponent,TranslateDemoComponent,NotificationsDemoComponent], // this loads all angular2-google-maps directives in this component
	// the following line sets the height of the map - Important: if you don't set a height, you won't see a map!!
	template: require('./home.component.html'),
    pipes: [TranslatePipe] 
})
export class HomeComponent {
	constructor(public translate: TranslateService) {
		
	}
}