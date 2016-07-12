import { Component, OnInit } from '@angular/core';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { CanDeactivate, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { NotificationsService } from 'angular2-notifications';

import { BlogService } from '../blog-list/blog.service';
// import {BasicValidators} from '../shared/basicValidators';
// import {UserService} from '../users/user.service';
// import {User} from './user';
import { BlogPostForm } from '../blog-list/blog';
import { ModalService } from '../shared/modal.service';

@Component({
	template: require('./blog-form.component.html'),
	providers: [ BlogService, ModalService],
	directives: [ FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class BlogFormComponent implements OnInit {

	blogForm: FormGroup;
	saving: boolean;
	public heading: string = '';
	// user = new User();
	blog = new BlogPostForm();
	lastModalResult: any;
	constructor(fb: FormBuilder,
		private _router: Router,
		private _route: ActivatedRoute,
		private _blogService: BlogService,
		private _notificationsService: NotificationsService,
		private _modalService: ModalService
	) {

		this.blogForm = fb.group({
			title: ['', Validators.required],
			body: ['', Validators.required]
		});
		this.saving = false;
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
	}

	canDeactivate(): Observable<boolean> | boolean {
		// Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
		if (!this.blogForm.dirty || this.blogForm.pristine || this.saving) {
			return true;
		}
		// Otherwise ask the user with the dialog service and return its
		// promise which resolves to true or false when the user decides
		let p = this._modalService.confirm('Discard changes?');
		let o = Observable.fromPromise(p);
		return o;
	}

	/*routerCanDeactivate() {
		if (this.form.dirty)
			return confirm('You have unsaved changes. Are you sure you want to navigate away?');
		return true;
	}*/

	save() {
		this.saving = true;
		let self = this;
		let result;
		this.blog = this.blogForm.value;
		//console.log(this.blog);
		result = this._blogService.postBlog(this.blog);

		result.subscribe(
			x => {
				self._notificationsService.success('Create Blog', 'Blog has been created successfully');
			},
			error => {
				self.saving = false;
				self._notificationsService.error('Error creating blog', 'Creating blog has been failed');
			},
			() => {
				this._router.navigate(['/home']);
			}
		);
	}
}
