/* tslint:disable */
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

import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { BasicValidators } from '../shared/basicValidators';
import { UserService } from '../users/user.service';
import { User, Address, UserClass } from './user';
import { Publications } from '../blog-list/blog';
import { SettingsService, CMSTypes } from '../shared/settings.service';
import { ModalService } from '../shared/modal.service';

@Component({
	templateUrl: './user-form.component.html',
	providers: [UserService , ModalService],
	directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]

})
export class UserFormComponent implements OnInit { 

	userForm: FormGroup;
	title: string;
	saving: boolean;
	user: User = new UserClass();

	constructor(private fb: FormBuilder,
		private _router: Router,
		private _route: ActivatedRoute,
		private _userService: UserService,
		private settings: SettingsService,
		private _modalService: ModalService
	) {
		this.saving = false;
		this.userForm = this.fb.group({
			name: ['', Validators.required],
			mail: ['', BasicValidators.email],
			phone: [''],
			address: this.fb.group({
				street: [''],
				suite: [''],
				city: [''],
				zipcode: ['']
			})
		});
	}

	ngOnInit() {
		this.getUser();
	}

	getUser() {
		let id; // = this._routeParams.get('id');
		let name; // = this._routeParams.get('name');


		this._route
            .params
            .subscribe(params => {
                id = params['id'];
				name = params['name'];
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
						// TODO: Future updates when feature is available
						// this.userForm.updateValue(user);
						this.populate(user);
					},
					response => {
						if (response.status === 404) {
							this._router.navigate(['NotFound']);
						}
					}

					);
			});

	}

	save() {
		this.saving = true;
		let self = this;
		let result;
		this.user = this.userForm.value;
		console.log(this.user);
		if (this.user.uid) {
			result = this._userService.updateUser(this.user);
		} else {
			result = this._userService.addUser(this.user);
		}

		result.subscribe(x => {
			this._router.navigate(['/users']);
			self.saving = false;
		});
	}

	populate(user: User) {
		(<FormControl>this.userForm.controls['name'])
			.updateValue(user.name, { onlySelf: true });
		(<FormControl>this.userForm.controls['mail'])
			.updateValue(user.mail, { onlySelf: true });
		(<FormControl>this.userForm.controls['phone'])
			.updateValue(user.phone, { onlySelf: true });
		(<FormControl>
			(<FormGroup>this.userForm.controls['address']).controls['street'])
				.updateValue(user.address.street,{ onlySelf: true });
		(<FormControl>
			(<FormGroup>this.userForm.controls['address']).controls['suite'])
				.updateValue(user.address.suite,{ onlySelf: true });
		(<FormControl>
			(<FormGroup>this.userForm.controls['address']).controls['city'])
				.updateValue(user.address.city,{ onlySelf: true });
		(<FormControl>
			(<FormGroup>this.userForm.controls['address']).controls['zipcode'])
				.updateValue(user.address.zipcode,{ onlySelf: true });
	}

	canDeactivate(): Observable<boolean> | boolean {
		// Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
		if (!this.userForm.dirty || this.userForm.pristine || this.saving) {
			return true;
		}
		// Otherwise ask the user with the dialog service and return its
		// promise which resolves to true or false when the user decides
		let p = this._modalService.confirm('Discard changes?');
		let o = Observable.fromPromise(p);
		return o;
	}
}
