import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';

import * as Rx from 'rxjs/Rx';
import { BlogPost } from '../blog-list/blog';
import { BlogPostLive } from '../blog-list/blog';
import * as _ from 'lodash';
import { APP_CONFIG, CONFIG, Config } from '../app.config';
import { SettingsService, CMSTypes } from '../shared/settings.service';

@Injectable()
export class BlogService {
    private _url = '/assets/blogs-json';

    constructor(
        @Inject(APP_CONFIG) private config: Config,
        private _http: Http,
        private settings: SettingsService) {
    }
    
    parseSrcFromHtml(html: string) {
        let tHtml = html || '';
        var result;
        result = html.match(/src="(.+?)"/ig) || [];
        result = result.length ? result.join(',').replace(/"|src=/g, '') : "";
        result = (result == "") ? [] : result.split(',');
        return result || [];
    } 

    transformBlogs(data) {
        let self = this;
        var tData: any[] = [];
        _.forEach(data, function(value) {
            value.tags = (value.tags == "") ? [] : value.tags.split('|');
            value.images = self.parseSrcFromHtml(value.images);
            value.likes = 10;
            value.stars = 567;
            _.forEach(value.images, function(avalue, key) {
                value.images[key] = self.config.apiShort + avalue;
            })
            
            value.authoravatar = self.parseSrcFromHtml(value.authoravatar);
            if (value.authoravatar.length == 0) {
                value.authoravatar = '';
            } else {
                value.authoravatar = value.authoravatar[0];
            }
            tData.push(value);
        })
        return tData;
    }

    getBlogsFromDrupal(): Rx.Observable<BlogPostLive[]> {
      let url = 'http://10.146.201.72/Xperience/blogs';
      let self = this;

      return this._http.get(url)
        .map(res => res.json())
        .map(data => {
          let tData = this.transformBlogs(data);
          return tData;
        });
    }

    getBlogs(filter?: any) {
        
        if (this.settings.getCmsType() == CMSTypes.Drupal) {
            return this.getBlogsFromDrupal();
        }
        
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
    
    getBlogFromDrupal(id): Rx.Observable<BlogPostLive> {
        let url = 'http://10.146.201.72/Xperience/blogs';
        url += '/' + id;
        
        return this._http.get(url)
            .map(res => res.json())
            .flatMap(data => {
                let tData = this.transformBlogs(data);
                if (tData.length) {
                    return Rx.Observable.of(tData[0]);
                }
                
                return Rx.Observable.throw(new Error('No data found'));
            })
    }

    getBlog(id): Rx.Observable<BlogPostLive> {
        
        if (this.settings.getCmsType() == CMSTypes.Drupal) {
            return this.getBlogFromDrupal(id);
        }
        
        let url = this._url;
        url += '/blogs.json';
        return this._http.get(url)
            .flatMap(res => {
                let data = res.json();
                
                let index = _.findIndex(data, function(o) {
                    return o.id == id; 
                });
                
                if (index !== -1) {
                    return Rx.Observable.of(data[index]);
                }
                
                return Rx.Observable.throw(new Error('Blog not exists'));
            });
            
    }

    getBlogUser(id) {
        let url = this._url;

        url += '/' + id + '.json';
        console.log(url);
        return this._http.get(url)
            .map(res => res.json());
    }

    getBlogUsers() {
        let url = this._url;

        url += '/users.json';

        return this._http.get(url)
            .map(res => res.json());
    }
}
