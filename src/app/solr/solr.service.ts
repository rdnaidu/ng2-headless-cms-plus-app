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

    getEventsLive(params: any) {
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
        } else {
            query.push('q=*');
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
    
    getEvents(params: any) {
        if (this.settings.getCmsType() == CMSTypes.Drupal) {
            return this.getEventsLive(params);
        }
        
        let url = this._url + '/solr-events.json';
        
        return this._http.get(url)
            .map(res => {
                let data = res.json();
                console.log(data);
                data = data.response;
                
                let category = _.map(params.category, function(val: any) {
                    return val.id;
                });
                
                console.log(category);
                let catRegExp = new RegExp('.*');
                if (category.length) catRegExp = new RegExp(category.join('|'));
                
                let docs = data.docs.filter(function(item) {
                    if (params.eventname != '') {
                        return catRegExp.test(item.event_type_name[0]) && (0 <= item.event_name.indexOf(params.eventname));
                    } else {
                        return catRegExp.test(item.event_type_name[0]);
                    }
                });
                
                data.numFound = docs.length;
                data.docs = _.take(_.drop(docs, params.start), params.rows);;
                
                return data;
            });
    }
    
    solrAutoSuggestLive(str: string) {
        let url = this.solrUrl + '/suggest' + '?q=' + str + 'wt=json&start=0&rows=10';

        return this._http.get(url)
            .map(res => {
                let data = res.json();
                let docs = data.response.docs.filter(function(item) {
                    let val = item.event_name[0];
                    return 0 <= val.indexOf(str);
                });
                
                data.response.docs = docs || [];

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
