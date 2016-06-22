import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { CanDeactivate, Router , ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { BlogService } from '../blog-list/blog.service';
// import {BasicValidators} from '../shared/basicValidators';
// import {UserService} from '../users/user.service';
// import {User} from './user';
import { BlogPostForm } from '../blog-list/blog';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
	template: require('./blog-form.component.html'),
	providers: [BlogService]

})
export class BlogFormComponent implements OnInit {

	form: ControlGroup;
	public heading: string = '';
	// user = new User();
	blog = new BlogPostForm();

	constructor(fb: FormBuilder,
		public modal: Modal,
		private _router: Router,
		private _route: ActivatedRoute,
		private _blogService: BlogService,
		private _notificationsService: NotificationsService
	) {

		this.form = fb.group({
			title: ['', Validators.required],
			body: ['', Validators.required]
		});
	}

	ngOnInit() {
		let id: any;
		this._route
			.params
			.subscribe(params => {
				id = +params['id'];
				this.heading = id ? 'Edit Blog' : 'New Blog';
				if (!id) {
					this.heading = 'New Blog';
					return;
				}
			});
	  /* let dialog =this.modal.confirm()
                .size('sm')
                .message('dd')
                .title('A simple Alert style modal window')
                .isBlocking(true)
                .open();
				
				
				dialog.then(
                 res => console.log(res)
                ).catch(
					error => console.log(error)
				);*/
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
				this._router.navigate(['/home']);
			}
		);

	}
}
