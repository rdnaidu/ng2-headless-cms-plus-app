import {Component, OnInit} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router, RouteParams} from '@angular/router-deprecated';

import {BlogUser} from '../blog-list/blog';
import {BlogService} from '../blog-list/blog.service';


import * as _ from 'lodash';

@Component({
    selector: 'blog-user',
    providers: [BlogService],
    template: require('./blog-user.component.html'),
    styles: [require('./blog-user.component.scss')],
    directives: [ROUTER_DIRECTIVES, MD_LIST_DIRECTIVES, MdButton]
})
export class BlogUserComponent implements OnInit {
    title: string;
    blogUser = <BlogUser>{};
    error: boolean;
    isLoading: boolean;

    constructor(private _router: Router,
        private _routeParams: RouteParams,
        private _service: BlogService
    ) {
    }


    ngOnInit() {

        let id = this._routeParams.get('id');
        this.error = false;
		this.isLoading = true;
        this._service.getBlogUser(id)
            .subscribe(
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
