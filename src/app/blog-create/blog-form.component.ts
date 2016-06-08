import {Component, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {CanDeactivate, Router, RouteParams} from '@angular/router-deprecated';
import { NotificationsService } from 'angular2-notifications';

import {BlogService} from '../blog-list/blog.service';
//import {BasicValidators} from '../shared/basicValidators';
// import {UserService} from '../users/user.service';
// import {User} from './user';
import {BlogPostForm} from '../blog-list/blog';

@Component({
	template: require('./blog-form.component.html'),
	providers: [BlogService]

})
export class BlogFormComponent implements OnInit, CanDeactivate {

	form: ControlGroup;
	public heading: string = '';
	//	user = new User();
	blog = new BlogPostForm();

	constructor(fb: FormBuilder,
		private _router: Router,
		private _routeParams: RouteParams,
		private _blogService: BlogService,
		private _notificationsService: NotificationsService
	) {

		this.form = fb.group({
			title: ['', Validators.required],
			body: ['', Validators.required]
		});
	}

	ngOnInit() {
		let id = this._routeParams.get('id');

		this.heading = id ? 'Edit Blog' : 'New Blog';

		if (!id) {
			this.heading = 'New Blog';
			return;
		}

	}

	routerCanDeactivate() {
		if (this.form.dirty)
			return confirm('You have unsaved changes. Are you sure you want to navigate away?');
		return true;
	}

	save() {
		let self = this;
		let result;
		result = this._blogService.postBlog(this.blog);
		
		result.subscribe(
			x => {
				self._notificationsService.success('Create Blog', 'Blog has been created successfully');
			},
			error => {
				self._notificationsService.error('Error creating blog', 'Creating blog has been failed');
			},
			() => {
				this._router.navigate(['Home']);
			}
		)

	}
}
