import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { OmdbSearchParams, OmdbIDSearchParams } from './omdb';
import { APP_CONFIG, CONFIG, Config } from '../app.config';

@Injectable()
export class OmdbService {
	constructor(private _http: Http, @Inject(APP_CONFIG) private config: Config) {}

	getDetails(params?: OmdbSearchParams) {
		let url = this.config.omdbURL;

		if (params && params.s !== '') {
			url += '?s=' + params.s;
		}

		if (params && params.page !== undefined) {
			url += '&page=' + params.page;
		}
		return this._http.get(url)
			.map(res => res.json());
	}

	getDetailsById(params?: OmdbIDSearchParams) {
		let url = this.config.omdbURL;

		if (params && params.i !== '') {
			url += '?i=' + params.i;
		}

		if (params && params.plot !== undefined) {
			url += '&plot=' + params.plot;
		}

		if (params && params.tomatoes !== undefined) {
			url += '&tomatoes=' + params.tomatoes;
		}
		return this._http.get(url)
			.map(res => res.json());
	}

}
