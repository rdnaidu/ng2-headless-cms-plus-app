import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {BlogListComponent} from '../blog-list/blog-list.component';

@Component({
	selector: 'my-home',
	directives: [BlogListComponent],
	template: require('./home.component.html')
})
export class HomeComponent {
	constructor() {
	}
}
