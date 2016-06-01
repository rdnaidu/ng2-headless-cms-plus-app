import {Component, OnInit} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

import {BlogSummary} from '../blog-list/blog';
import {BlogService} from '../blog-list/blog.service';

import * as _ from 'lodash';

@Component({
    selector: 'blog-summary-list',
	providers: [BlogService],
    template: require('./blog-summary-list.component.html'),
    directives: [ROUTER_DIRECTIVES, MD_LIST_DIRECTIVES, MdButton]
})
export class BlogSummaryListComponent implements OnInit {
    blogs: any[];
    olderBlogs: any[];
	isLoading = true;
	blogServiceError = false;
	errorMessage;
    today = new Date();
    constructor(private _service: BlogService) {

	}


    ngOnInit() {
		this.getTOBlogs();
	}
	
	getTOBlogs() {
		this._service.getTOBlogs()
			.subscribe(
			blogs => {
				console.log('blogs', blogs);
				this.blogs = blogs[0];
				this.olderBlogs = blogs[1];
				_.map(this.blogs, function addDate(data: BlogSummary) {
					data.postDate = new Date(data.publishdate);
				});
				
				_.map(this.olderBlogs, function addDate(data: BlogSummary) {
					data.postDate = new Date(data.publishdate);
				});
			},
			error => {
				this.blogServiceError = true;
				this.errorMessage = 'Unable to connect';
				this.isLoading = false;
				// console.log("EEEE");
			},
			() => {
				this.isLoading = false;
			});
	}
}
