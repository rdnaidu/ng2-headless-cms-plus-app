/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { CanDeactivate, Router, RouteParams } from '@angular/router-deprecated';

import { BasicValidators } from '../shared/basicValidators';
import { UserService } from '../users/user.service';
import { User, Address, UserClass } from './user';
import { Publications } from '../blog-list/blog';
import { SettingsService, CMSTypes } from '../shared/settings.service';

@Component({
	template: require('./user-form.component.html'),
	providers: [UserService]

})
export class UserFormComponent implements OnInit, CanDeactivate {

	form: ControlGroup;
	title: string;

	user: User = new UserClass();

	constructor(fb: FormBuilder,
			private _router: Router,
			private _routeParams: RouteParams,
			private _userService: UserService,
			private settings: SettingsService
	) {
		this.form = fb.group({
			name: ['', Validators.required],
			mail: ['', BasicValidators.email],
			phone: [],
			address: fb.group({
				street: [],
				suite: [],
				city: [],
				zipcode: []
			})
		});
	}

	ngOnInit() {
		this.getUser();
	}

	getUser() {
		let id = this._routeParams.get('id');
		let name = this._routeParams.get('name');
		this.title = id ? 'Edit User' : 'New User';

		let userid = name;

		if (this.settings.getCmsType() == CMSTypes.Drupal) {
			userid = id;
		}

		if (!id) return;

		this._userService.getUser(userid)
			.subscribe(
				user => {
					this.user = user;
					if (!this.user.uid) {
						this._router.navigate(['NewUser']);
					}
					console.log('this', this.user);
				},
				response => {
					console.log('hsdfsdf');
					if (response.status === 404) {
						this._router.navigate(['NotFound']);
					}
				}

			);
	}

	routerCanDeactivate() {
		if (this.form.dirty)
			return confirm('You have unsaved changes. Are you sure you want to navigate away?');
		return true;
	}

	save() {

		let result;

		if (this.user.uid) {
			result = this._userService.updateUser(this.user);
		} else {
			result = this._userService.addUser(this.user);
		}

		result.subscribe(x => {
			this._router.navigate(['Users']);
		});
	}
}
