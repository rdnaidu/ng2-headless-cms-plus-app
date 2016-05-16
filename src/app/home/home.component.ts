import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {BlogHomeComponent} from '../blog-home/blog-home.component';


@Component({
	selector: 'my-home',
	directives: [BlogHomeComponent],
	template: require('./home.component.html')
})
export class HomeComponent {
	constructor() {
	}
}
