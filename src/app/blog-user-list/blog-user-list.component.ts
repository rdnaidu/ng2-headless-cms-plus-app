import {Component, OnInit} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

import {BlogUser} from '../blog-list/blog';
import {BlogService} from '../blog-list/blog.service';

import * as _ from 'lodash';

@Component({
    selector: 'blog-user-list',
	providers: [BlogService],
    template: require('./blog-user-list.component.html'),
	styles: [require('./blog-user-list.component.scss')],
    directives: [ROUTER_DIRECTIVES, MD_LIST_DIRECTIVES, MdButton]
})
export class BlogUserListComponent implements OnInit {
    users: any[];
    isLoading = true;
	blogServiceError = false;
	errorMessage;
    today = new Date();
    constructor(private _service: BlogService) {

	}


    ngOnInit() {
		this._service.getBlogUsers()
			.subscribe(
			users => {
				this.users = users;
			},
			error => {
				this.blogServiceError = true;
				this.errorMessage = 'Unable able to connect';
				this.isLoading = false;
			},
			() => {
				this.isLoading = false;
			});
	}

}
