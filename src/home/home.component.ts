import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {TranslateService, TranslatePipe, TRANSLATE_PROVIDERS} from 'ng2-translate/ng2-translate';

import {TranslateDemoComponent} from '../translate-demo/translate-demo.component';

import {NotificationsDemoComponent} from '../notifications-demo/notifications-demo.component';

import {ListDemo} from '../demo-app/list/list-demo';
import {SidenavDemo} from '../demo-app/sidenav/sidenav-demo';

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

@Component({
	selector: 'my-home',
	directives: [TranslateDemoComponent,NotificationsDemoComponent,ListDemo,SidenavDemo], 
	
	template: require('./home.component.html'),
    pipes: [TranslatePipe] 
})
export class HomeComponent {
	constructor(public translate: TranslateService) {
		
	}
}