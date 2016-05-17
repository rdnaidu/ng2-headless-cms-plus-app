import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TagListService {

    private _url = '/assets/blogs-json';

    constructor(private _http: Http) {

    }

    getTags(filter?) {
        let url = this._url;

        if (filter && filter.username) {
            url += '/' + filter.username;
        } else {
            url += '/tags.json';
        }
       // console.log(url);
        return this._http.get(url)
            .map(res => res.json());
    }

    getTag(id) {
        let url = this._url;

        url += '/' + id + '.json';
        console.log(url);
        return this._http.get(url)
            .map(res => res.json());
    }
}
