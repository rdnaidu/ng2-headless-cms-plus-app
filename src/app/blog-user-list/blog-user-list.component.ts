import { Component, OnInit } from '@angular/core';
import { MdButton } from '@angular2-material/button';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { SpinnerComponent } from '../shared/spinner.component';
import { BlogUser } from '../blog-list/blog';
import { BlogService } from '../blog-list/blog.service';
import { UserService } from '../users/user.service';

import * as _ from 'lodash';

@Component({
    selector: 'blog-user-list',
	providers: [BlogService, UserService],
    template: require('./blog-user-list.component.html'),
	styles: [require('./blog-user-list.component.scss')],
    directives: [ROUTER_DIRECTIVES, MD_LIST_DIRECTIVES, MdButton, SpinnerComponent]
})
export class BlogUserListComponent implements OnInit {
    users: any[];
    isLoading = true;
	blogServiceError = false;
	errorMessage;
    today = new Date();
    constructor(
		private _service: BlogService,
		private _userService: UserService
	) {

	}


    ngOnInit() {
		this.loadUsers();
	}

	private loadUsers() {
		this.isLoading = true;
		this._userService.getUsers()
			.subscribe(
			users => {
				this.users = users;
			},
			error => {
				this.blogServiceError = true;
				this.errorMessage = 'Unable to connect';
				this.isLoading = false;
			},
			() => {
				this.isLoading = false;
			});
	}
}
