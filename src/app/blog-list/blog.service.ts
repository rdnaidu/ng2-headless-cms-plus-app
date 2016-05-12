import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BlogService {

	private _url = '/assets/blogs-json';

	constructor(private _http: Http) {

	}

	getBlogs(filter?) {
		let url = this._url;

		if (filter && filter.phoneId) {
            url += '/' + filter.phoneId;
        } else {
            url += '/blogs.json';
        }

        return this._http.get(url)
				.map(res => res.json());
	}

    getBlog(id) {
        let url = this._url;

        url += '/' + id + '.json';

        return this._http.get(url)
                .map(res => res.json());
    }
}
