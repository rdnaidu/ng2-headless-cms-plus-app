/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { MdButton } from '@angular2-material/button';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { ROUTER_DIRECTIVES, Router ,ActivatedRoute} from '@angular/router';

import { SpinnerComponent } from '../shared/spinner.component';
import { BlogUser } from '../blog-list/blog';
import { BlogService } from '../blog-list/blog.service';
import { UserService } from '../users/user.service';
import { AuthService } from '../auth/auth.service';
import { SettingsService, CMSTypes } from '../shared/settings.service';
import { User } from '../users/user';
import { NotificationsService } from 'angular2-notifications';

import * as Rx from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
    selector: 'blog-user',
    providers: [BlogService, UserService, AuthService],
    template: require('./blog-user.component.html'),
    styles: [require('./blog-user.component.scss')],
    directives: [ROUTER_DIRECTIVES, MD_LIST_DIRECTIVES, MdButton, SpinnerComponent]
})
export class BlogUserComponent implements OnInit {
    title: string;
    blogUser = <User>{};
    error: boolean;
    isLoading: boolean;

    constructor(
        public auth: AuthService,
        public settings: SettingsService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _service: BlogService,
        private _userService: UserService,
        private _notificationsService: NotificationsService
    ) {}

    public deletePost(postId: number) {
        let self = this;
        this._service.deleteBlog(postId)
            .subscribe(
                x => {
                    self._notificationsService.success('Delete Blog', 'Blog has been deleted successfully');
                    let index = _.findIndex(self.blogUser.publications, {nid: postId});
                    if (index !== -1) {
                        self.blogUser.publications.splice(index, 1);
                    }
                    //this.loadUser();
                },
                error => {
                    if (error.status !== 204) {
                        self._notificationsService.error('Delete Blog', 'Deleting blog has been failed');
                        
                    } else {
                        self._notificationsService.success('Delete Blog', 'Blog has been deleted successfully');
                        let index = _.findIndex(self.blogUser.publications, {nid: postId});
                        if (index !== -1) {
                            self.blogUser.publications.splice(index, 1);
                        }
                    }
                }
            );
    }


    ngOnInit() {
        this.loadUser();
    }

    private loadUser() {

        let id;// = this._routeParams.get('id');
        let name;// = this._routeParams.get('name');
        console.log("Called");
        this._route
            .params
            .subscribe(params => {
                id = +params['id'];
                name = params['name'];
                console.log(params);

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
                            //      console.log(this.blogUser);
                        },
                        error => {
                            if (error.status === 404) {
                                this._router.navigate(['NotFound']);
                            }
                            //      console.log('ERR:' + error);
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
                            //  console.log(this.blogUser);
                        },
                        error => {
                            if (error.status === 404) {
                                this._router.navigate(['NotFound']);
                            }
                            //     console.log('ERR:' + error);
                            this.error = true;
                            this.isLoading = false;
                        }

                    );
                }
            });

    }

}
