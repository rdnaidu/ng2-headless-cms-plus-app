import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import * as Rx from 'rxjs/Rx';
import { APP_CONFIG, CONFIG, Config } from '../app.config';
import { SettingsService, CMSTypes } from '../shared/settings.service';
import { Tag } from './tag';

@Injectable()
export class TagListService {

    private _url = '/assets/blogs-json';
    private liveUrl: string;

    constructor(
        @Inject(APP_CONFIG) private config: Config,
        private _http: Http,
        private settings: SettingsService) {
        this.liveUrl = this.config.apiEndPoint + '/tags';
    }
    
    getTagsFromDrupal() {
        let self = this;
        
        return this._http.get(this.liveUrl)
            .map(res => res.json());
    }
    
    getTagFromDrupal(id) {
        let self = this;
        
        return this._http.get(this.liveUrl + '/' + id)
            .map(res => res.json());
    }

    getTags(filter?): Rx.Observable<Tag[]> {
        
        if (this.settings.getCmsType() == CMSTypes.Drupal) {
            return this.getTagsFromDrupal();
        }
        
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
        
        if (this.settings.getCmsType() == CMSTypes.Drupal) {
            return this.getTagFromDrupal(id);
        }
        
        let url = this._url;

        url += '/' + id + '.json';
        console.log(url);
        return this._http.get(url)
            .map(res => res.json());
    }
}
