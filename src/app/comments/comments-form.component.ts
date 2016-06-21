import { Component, OnInit, Input } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { BlogPost, Comments } from '../blog-list/blog';
import { AuthService } from '../auth/auth.service';
@Component({
    selector: 'comments-form',
    template: require('./comments-form.component.html'),
    directives: [ROUTER_DIRECTIVES]
})
export class CommentsFormComponent implements OnInit {

    title: string = 'Comments';


    constructor(public auth: AuthService) {

    }

    ngOnInit() {

    }


}
