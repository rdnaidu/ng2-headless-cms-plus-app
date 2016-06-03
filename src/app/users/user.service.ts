import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import * as Rx from 'rxjs/Rx';

import { APP_CONFIG, CONFIG, Config } from '../app.config';
import { SettingsService, CMSTypes } from '../shared/settings.service';
import { User, Address, UserClass } from './user';
import { HelperService } from '../shared/services/helper.service';

@Injectable()
export class UserService {

	private _url = '/assets/blogs-json';

	constructor(
		@Inject(APP_CONFIG) private config: Config,
		private settings: SettingsService,
		private _http: Http,
		private helper: HelperService
	) {

	}
	
	getUrl() {
		return this._url;
	}
	
	getLiveUrl() {
		return this.config.apiEndPoint + '/users';
	}
	
	getUsersFromDrupal() {
		let url = this.getLiveUrl() + '?t=' + (new Date()).getTime();
		let self = this;
		return this._http.get(url)
			.map(res => {
				return res.json();
			})
			.map(data => {
				let tData = [];
				
				_.forEach(data, function(object) {
					let avatar = self.helper.parseSrcFromHtml(object.avatar);
					
					if (avatar.length) {
						avatar = avatar[0];
					} else {
						avatar = '';
					}
					
					object.avatar = self.config.apiShort + avatar;
					object.address = {
						street: '',
						suite: '',
						city: '',
						zipcode: ''
					} as Address;
					object.publications = [];
					tData.push(object);
				});
				
				return tData;
			});
	}
	
	getUserFromDrupal(userId): Rx.Observable<User> {
		let url = this.getLiveUrl() + '/' + userId + '?t=' + (new Date()).getTime();
		let self = this;
		return this._http.get(url)
			.map(res => res.json())
			.map(res => {
				if (res.length) {
					let avatar = self.helper.parseSrcFromHtml(res[0].avatar);
					
					if (avatar.length) {
						avatar = avatar[0];
					} else {
						avatar = '';
					}
					
					res[0].avatar = self.config.apiShort + avatar;
					return res[0];
				}
				return new UserClass();
			});
	}

	getUsers(): Rx.Observable<User[]> {
		
		if (this.settings.getCmsType() == CMSTypes.Drupal) {
			return this.getUsersFromDrupal();
		}
		
		let url = this.getUrl() + '/users.json';
		
		return this._http.get(url)
				.map(res => res.json());
	}

	getUser(userId): Rx.Observable<User> {
		
		if (this.settings.getCmsType() == CMSTypes.Drupal) {
			return this.getUserFromDrupal(userId);
		}
		
		let url = this.getUserUrl(userId) + '.json';
		
		return this._http.get(url)
				.map(res => res.json());
	}

	addUser(user) {
		return this._http.post(this._url, JSON.stringify(user))
			.map(res => res.json());
	}

	updateUser(user) {

		return this._http.put(
				this.getUserUrl(user.id),
				JSON.stringify(user))
				.map(res => res.json());
	}

	deleteUser(user) {
		return this._http.delete(this.getUserUrl(user.id))
				.map(res => res.json());
	}
	private getUserUrl(userId) {
		return this._url + '/' + userId;
	}
}
