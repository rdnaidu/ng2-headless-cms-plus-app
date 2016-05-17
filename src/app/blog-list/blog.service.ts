import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {BlogPost} from '../blog-list/blog';
@Injectable()
export class BlogService {

    private _url = '/assets/blogs-json';

    constructor(private _http: Http) {

    }

    getBlogs(filter?) {
        let url = this._url;

        if (filter && filter.username) {
            url += '/' + filter.username;
        } else {
            url += '/blogs.json';
        }
        console.log(url);
        return this._http.get(url)
            .map(res => res.json());
    }

    getBlog(id) {

        let url = this._url;
        url += '/blogs.json';
        return this._http.get(url)
            .flatMap(res => res.json())
            .filter(res => {
                if ((<BlogPost>res).id == id) {
                    return true;
                }
                return false;
            });
    }

    getBlogUser(id) {
        let url = this._url;

        url += '/' + id + '.json';
        console.log(url);
        return this._http.get(url)
            .map(res => res.json());
    }
}
