import {Component, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {CanDeactivate, Router, RouteParams} from '@angular/router-deprecated';

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
		private _blogService: BlogService
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

		let result;
		result = this._blogService.postBlog(this.blog);

		result.subscribe(
			x => {
				alert("Blog successfully created");
			},
			error => {
				alert("Error creating blog");
			},
			() => {
				this._router.navigate(['Home']);
			}
		)

	}
}
