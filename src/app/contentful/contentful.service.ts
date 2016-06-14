import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import * as _ from 'lodash';
import { SettingsService, ContentfulSettings } from '../shared/settings.service';

import { ContentfulPost, ContentfulAuthor } from './contentStructure';


@Injectable()
export class ContentfulService {
    client: any;
    postContentTypeID: string;
    authorContentTypeID: string;


    constructor(public settingService: SettingsService) {
        // TODO: Commented out contentful APIs and service as there was in 
        // issue in prod runtime with CreateClient
        // this.client = this.settingService.getContentfulClient();
        // this.postContentTypeID = this.settingService.getContentfulSettings().contenttype_post;
        // this.authorContentTypeID = this.settingService.getContentfulSettings().
        // contenttype_author;
    }


    LoadPostEntries(): Rx.Observable<any> {

         return Rx.Observable.fromPromise(
            this.client.getEntries({
                'content_type': this.postContentTypeID
            }));


    }



    /*  LoadAuthorEntries(): Rx.Observable<ContentfulAuthor[]> {
          let entriesVar: Array<ContentfulAuthor> = new Array<ContentfulAuthor>();
  
          this.client.getEntries({
              'content_type': this.authorContentTypeID
          }).then(function (entries) {
                  entries.items.forEach(function (entry: ContentfulAuthor) {
  
                      entriesVar.push(entry);
  
                  });
  
                  console.log(entriesVar);
               
              });
          return Rx.Observable.of(entriesVar);
      }*/
}
