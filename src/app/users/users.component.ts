import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { UserService } from './user.service';
import { SpinnerComponent } from '../shared/spinner.component';
import { AlertComponent } from '../shared/alert.component';
import { isLoggedIn } from '../auth/isLoggedIn';

@Component({
	template: require('./users.component.html'),
	providers: [UserService],
	directives: [ROUTER_DIRECTIVES, SpinnerComponent, AlertComponent]
})

export class UsersComponent implements OnInit {

	users: any[];
	isLoading = true;
	userServiceError = false;
	errorMessage;

	constructor(private _service: UserService) {

	}

	ngOnInit() {
		this._service.getUsers()
			.subscribe(
				users => this.users = users,
				error => {
					this.userServiceError = true;
					this.errorMessage = 'Unable able to connect';
					this.isLoading = false;
				},
				() => {
					this.isLoading = false;
				});
	}

	deleteUser(user) {
		if (confirm('Are you sure you want to delete ' + user.name + '?')) {
			let index = this.users.indexOf(user);

			this.users.splice(index, 1);

			this._service.deleteUser(user.id)
				.subscribe(undefined,
					err => {
						alert('Could not delete the user.');
						this.users.splice(index, 0, user);
					}

					);
		}

	}

}
