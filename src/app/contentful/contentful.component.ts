import { Component, OnInit, OnChanges, SimpleChange, Input } from '@angular/core';
import { MdButton } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { RouteConfig, ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { SpinnerComponent } from '../shared/spinner.component';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { SearchService } from '../shared/search.service';
import { SettingsService } from '../shared/settings.service';
import * as Rx from 'rxjs/Rx';
import { ContentfulService } from '../contentful/contentful.service.ts';
import * as _ from 'lodash';

import {ContentfulPost, ContentfulAuthor } from './contentStructure';

@Component({
  selector: 'contentful-demo',
  template: require('./contentful.component.html'),
  providers: [ContentfulService],
  directives: [
    ROUTER_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdButton,
    MD_CARD_DIRECTIVES,
    PAGINATION_DIRECTIVES,
    SpinnerComponent
  ]
})
export class ContentfulComponent implements OnInit {
  posts = new Array<ContentfulPost>();
  blogs: any[];
  client: any;
  postContentTypeID: string;
  authorContentTypeID: string;
  loadresult;
  postsLoading: boolean;
  blogServiceError = false;
  errorMessage;

  constructor(public searchService: SearchService,
    public settingService: SettingsService,
    public contentfulService: ContentfulService) {
  // TODO: Commented out contentful APIs and service as there was in issue in prod runtime with CreateClient
  //  this.client = this.settingService.getContentfulClient();
  //   this.postContentTypeID = this.settingService.getContentfulSettings().contenttype_post;
  //  this.authorContentTypeID = this.settingService.getContentfulSettings().contenttype_author;
  }

  loadContentfulEntries() {

    this.contentfulService.LoadPostEntries()
      .subscribe(
      res => {
        this.extractData(res.items);
      }
      );
  }



  ngOnInit() {
    this.loadContentfulEntries();
  }
  private extractData(entries: any[]) {
    this.posts = entries;
    //console.log(this.posts);
  }




}
