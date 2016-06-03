import {Component, OnInit} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router, RouteParams} from '@angular/router-deprecated';

import {BlogUser} from '../blog-list/blog';
import {BlogService} from '../blog-list/blog.service';
import { UserService } from '../users/user.service';
import { SettingsService, CMSTypes } from '../shared/settings.service';
import { User } from '../users/user';

import * as Rx from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
    selector: 'blog-user',
    providers: [BlogService, UserService],
    template: require('./blog-user.component.html'),
    styles: [require('./blog-user.component.scss')],
    directives: [ROUTER_DIRECTIVES, MD_LIST_DIRECTIVES, MdButton]
})
export class BlogUserComponent implements OnInit {
    title: string;
    blogUser = <User>{};
    error: boolean;
    isLoading: boolean;

    constructor(private _router: Router,
        private _routeParams: RouteParams,
        private _service: BlogService,
        private _userService: UserService,
        private settings: SettingsService
    ) {
    }


    ngOnInit() {

        let id = this._routeParams.get('id');
        let name = this._routeParams.get('name');
        let userid = name;
        this.error = false;
		this.isLoading = true;
        
        if (this.settings.getCmsType() == CMSTypes.Drupal) {
            userid = id;
        }
        
        let userStream = this._userService.getUser(userid);
        if (this.settings.getCmsType() == CMSTypes.Drupal) {
            let blogStream = this._service.getBlogsByUser(userid);
            
            Rx.Observable.forkJoin(userStream, blogStream).subscribe(
            blogUser => {
                this.blogUser = blogUser[0];
                this.blogUser.publications = blogUser[1];
                this.error = false;
				this.isLoading = false;
                console.log(this.blogUser);
            },
            error => {
                if (error.status === 404) {
                    this._router.navigate(['NotFound']);
                }
                console.log('ERR:' + error);
                this.error = true;
				this.isLoading = false;
            }

            );
            
        } else {
            userStream.subscribe(
            blogUser => {
                this.blogUser = blogUser;
                this.error = false;
				this.isLoading = false;
                console.log(this.blogUser);
            },
            error => {
                if (error.status === 404) {
                    this._router.navigate(['NotFound']);
                }
                console.log('ERR:' + error);
                this.error = true;
				this.isLoading = false;
            }

            );
        }   
    }

}
