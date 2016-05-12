import {Component, OnInit} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

import {BlogSummary} from '../blog-list/blog-summary';
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
    messages: any[] = [
        {
            from: 'Nancy',
            subject: 'Brunch?',
            message: 'Did you want to go on Sunday? I was thinking that might work.',
            image: 'https://angular.io/resources/images/bios/julie-ralph.jpg'
        },
        {
            from: 'Mary',
            subject: 'Summer BBQ',
            message: 'Wish I could come, but I have some prior obligations.',
            image: 'https://angular.io/resources/images/bios/juleskremer.jpg'
        },
        {
            from: 'Bobby',
            subject: 'Oui oui',
            message: 'Do you have Paris reservations for the 15th? I just booked!',
            image: 'https://angular.io/resources/images/bios/jelbourn.jpg'
        }
    ];

    constructor(private _service: BlogService) {

	}

    ngOnInit() {
		this._service.getBlogs()
			.subscribe(
				blogs => {
                    this.blogs = _.take(blogs, 5);
                    this.olderBlogs = _.take(_.drop(blogs, 4), 10);
                },
				error => {
					this.blogServiceError = true;
					this.errorMessage = 'Unable able to connect';
					this.isLoading = false;
                   // console.log("EEEE");
				},
				() => {
					this.isLoading = false;
				});
	}

}
