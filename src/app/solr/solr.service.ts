import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SettingsService, CMSTypes } from '../shared/settings.service';
import * as _ from 'lodash';

@Injectable()
export class SolrService {
    private _url = '/assets/blogs-json';
    private solrUrl = 'http://10.146.201.83:8080/solr/collection1';

    constructor(private _http: Http, private settings: SettingsService) {
        
    }

    getEvents(params: any) {
        let url = this.solrUrl + '/select';
        let query = [];
        let category = [];

        _.forEach(params.category, function(v) {
            category.push(v.id);
        });

        let categoryStr = category.join('|');

        if (params.eventname !== '' && categoryStr !== '') {
            query.push('q=event_name:' + params.eventname + ' AND event_type_name:' + categoryStr);
        } else if(params.eventname !== '') {
            query.push('q=event_name:' + params.eventname);
        } else if(categoryStr !== '') {
            query.push('q=event_type_name:' + categoryStr);
        }

        query.push('start=' + params.start)
        query.push('rows=' + params.rows);
        query.push('wt=json');
        let queryStr = '?' + query.join('&');
        url += queryStr;
        
        return this._http.get(url)
            .map(res => {
               let data = res.json();
               return data.responseHeader.response;
            });
    }
    
    solrAutoSuggestLive(str: string) {
        let url = this.solrUrl + '/suggest' + '?q=' + str + 'wt=json&start=0&rows=10';

        return this._http.get(url)
            .map(res => {
                let data = res.json()

                let tmpData = [];

                _.forEach(data.response.docs, function(v, i) {
                    let value = v.event_name[0];
                    tmpData.push({id: value, name: value});
                })

                return tmpData;
            })
            .toPromise();
    }
    
    solrAutoSuggest(str: string) {
        if (this.settings.getCmsType() == CMSTypes.Drupal) {
            return this.solrAutoSuggestLive(str);
        }

        let url = this._url + '/solr-suggest.json';

        return this._http.get(url)
            .map(res => {
                let data = res.json()

                let tmpData = [];

                _.forEach(data.response.docs, function(v, i) {
                    let value = v.event_name[0];
                    tmpData.push({id: value, name: value});
                })

                return tmpData;
            })
            .toPromise();
    }
}
