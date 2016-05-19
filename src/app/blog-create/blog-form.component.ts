import {Component, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {CanDeactivate, Router, RouteParams} from '@angular/router-deprecated';

//import {BasicValidators} from '../shared/basicValidators';
// import {UserService} from '../users/user.service';
// import {User} from './user';
import {BlogPost} from '../blog-list/blog';

@Component({
	template: require('./blog-form.component.html')

})
export class BlogFormComponent implements OnInit, CanDeactivate {

	form: ControlGroup;
	public heading: string = '';
//	user = new User();
	blog = new BlogPost();

	constructor(fb: FormBuilder,
			private _router: Router,
			private _routeParams: RouteParams
			) {

		this.form = fb.group({
			title: ['', Validators.required],
			abstract: ['', Validators.required],
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
				
		// console.log("Herer");
	/*	this._userService.getUser(id)
				.subscribe(
					user =>
						this.user = user,
					response => {
						if (response.status === 404) {
							this._router.navigate(['NotFound']);
						}
					}

				);*/
	}

	routerCanDeactivate() {
		if (this.form.dirty)
			return confirm('You have unsaved changes. Are you sure you want to navigate away?');
		return true;
	}

	save() {

		let result;

/*		if (this.user.id) {
			result = this._userService.updateUser(this.user);
		} else {
			result = this._userService.addUser(this.user);
		}
*/
	//	result.subscribe(x => {
				// this.form.markAsPristine();
					this._router.navigate(['Home']);
	//	});
	}
}
