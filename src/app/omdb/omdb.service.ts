import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { OmdbSearchParams, OmdbIDSearchParams } from './omdb';

@Injectable()
export class OmdbService {
	private _url = 'http://www.omdbapi.com/';


	constructor(private _http: Http) {

	}

	getDetails(params?: OmdbSearchParams) {
		let url = this._url;

		//	if (filter && filter.userId)
		//		url += '?userId=' + filter.userId;
		if (params && params.s != '') {
			url += '?s=' + params.s;
		}

		if (params && params.page != undefined) {
			url += '&page=' + params.page;
		}
		//console.log(url);
		return this._http.get(url)
			.map(res => res.json());
	}

	getDetailsById(params?: OmdbIDSearchParams) {
		let url = this._url;
		
		if (params && params.i != '') {
			url += '?i=' + params.i;
		}

		if (params && params.plot != undefined) {
			url += '&plot=' + params.plot;
		}

		if (params && params.tomatoes != undefined) {
			url += '&tomatoes=' + params.tomatoes;
		}
		//console.log(url);
		return this._http.get(url)
			.map(res => res.json());
	}

}
