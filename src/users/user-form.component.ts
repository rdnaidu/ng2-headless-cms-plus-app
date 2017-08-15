import {Component,OnInit} from '@angular/core';
import {FormBuilder, ControlGroup,Validators} from '@angular/common';
import {CanDeactivate,Router,RouteParams} from '@angular/router-deprecated';

import {BasicValidators} from '../shared/basicValidators';
import {UserService} from '../users/user.service';
import {User} from './user';

@Component({
	template: require('./user-form.component.html'),
	providers: [UserService]

})
export class UserFormComponent implements OnInit,CanDeactivate{

	form: ControlGroup;
	title: string;
	user = new User();

	constructor(fb: FormBuilder,
			private _router: Router,
			private _routeParams: RouteParams, 
			private _userService: UserService
			) {

		this.form = fb.group({
			name: ['',Validators.required],
			email: ['', BasicValidators.email],
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
		var id = this._routeParams.get("id");

		this.title = id ? "Edit User" : "New User";

		if (!id)
				return;
		//console.log("Herer");
		this._userService.getUser(id)
				.subscribe(
					user =>
						this.user = user,
					response => {
						if (response.status == 404) {
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

		var result;

		if (this.user.id)
			result = this._userService.updateUser(this.user);
		else
			result = this._userService.addUser(this.user);

		result.subscribe(x => {
				// this.form.markAsPristine();
					this._router.navigate(['Users']);
		});
	}
}