import { Injectable, Inject, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { SessionService } from '../shared/services/session.service';
import { UserService } from '../users/user.service';
import { APP_CONFIG, CONFIG, Config } from '../app.config';
import { AuthUser, AuthUserClass, BasicAuth } from './auth-user';
import { SettingsService, CMSTypes } from '../shared/settings.service';

/* Authentication Service for
      1) Storing the current auth token (if loggedIn)
      2) Handle login and logout methods
*/
@Injectable()
export class AuthService implements OnInit {
    user: AuthUser = new AuthUserClass();
    key: string = 'authuser';
    public loggedIn;
    token: string;
    public username: String;
    public avatar: string;
    constructor(
        public sessionService: SessionService,
        @Inject(APP_CONFIG) private config: Config,
        private http: Http,
        private basicAuth: BasicAuth,
        private userService: UserService,
        private settings: SettingsService
    ) {
        this.initialize();
        /*this.loggedIn = false;
        localStorage.removeItem('token');
        this.token = localStorage.getItem('token');
        this.avatar = 'https://angular.io/resources/images/bios/alex-eagle.jpg';*/
    }

    ngOnInit() {
        this.initialize();
    }

    getToken() {
        return this.user.token;
    }



    encode(username, password) {
        return btoa(username + ':' + password);
    }

    public login(username?: String, password?: String): Observable<any> {
        // This is just a login from local which have credentials locallay
        let self = this;
        let userStream;

        if (this.settings.getCmsType() === CMSTypes.Stub) {
            userStream = this.userService.getUser(username);
        } else {
            let user = this.basicAuth.checkUser(username, password);
            if (!user) return Observable.throw(new Error('Please check username and password'));

            let url = this.config.apiEndPoint + '/user/login';
            let body = 'name=' + username + '&pass=' + password + '&form_id=user_login_form';
            let csrfToken = this.sessionService.get('X-CSRF-Token');
            if (csrfToken === undefined) {
                csrfToken = this.setCSRFToken();
            }
            let headers = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRF-Token': csrfToken
            });

            let options = new RequestOptions({ headers: headers });
            let logSuccess = false;
            /* This works but not really required as the encoding and username/password
             check is already done.
             this.http.post(url, body, options)
                 .map(response => response.headers)
                 .subscribe(
                 result => { 
                     console.log(result);
                     // Assume the redirect error will happen for a valid user
                    // return Observable.throw(new Error('Please check username and password')); },
                 },
                 error => {
                     console.log(error);
                     console.log(error.status);
                     if (error.status === 200) {
                 //        this.postBlog(encodedString);
                     } else {
                         return Observable.throw(new Error('Please check username and password'));
                     }
                 }
                 );
         */

            userStream = this.userService.getUser(user.uid);


        }

        return userStream
            .map(res => {
                self.user.isLoggedIn = true;
                self.user.token = this.encode(res.name, password);
                self.user.data = res;
                self.setSession();

                return res;
            });

        // TODO: have to update drupal 8 which have to accept restfull login
        /*
        let url = this.config.apiEndPoint + '/user/login';
        let body = "name=" + username + "&pass=" + password + "&form_id=user_login_form"; 
        
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(url, body, options)
            .map(res => {
                // TODO: Have to modify here once restfull login in drupal 8 is done
                return res;
            });
        */
    }

    public getCSRFToken(force?: boolean) {
        if (force !== undefined && !force) {
            let token = this.sessionService.get('X-CSRF-Token');
            if (token !== undefined)
                return token;
        }
        return this.setCSRFToken();
    }

    public setCSRFToken() {

        let _url = this.config.apiEndPoint + '/rest/session/token';
        let csrfToken: any;
        this.http.get(_url)
            .map(response => response.text())
            .subscribe(
            res => {
                //  console.log(res);
                csrfToken = res;
                this.sessionService.set('X-CSRF-Token', csrfToken);
                return csrfToken;
            },
            error => { console.log(error); },
            () => { }
            );

    }

    public logout() {
        // TODO: Have to call the drupal api when drupal rest api is done for logout
        let self = this;
        return Observable.of(true)
            .map(res => {
                self.clearSession();
                return res;
            });
    }

    public check() {
        //  return Observable.of(this.loggedIn);
        return Observable.of(!!this.getToken());
    }

    private initialize() {
        if (this.sessionService.get(this.key, this.user.rememberMe)) {
            let user = this.sessionService.get(this.key, this.user.rememberMe);
            this.user = user;
        }
    }



    private setSession() {
        this.sessionService.set(this.key, this.user, this.user.rememberMe);
    }

    private clearSession() {
        this.sessionService.remove(this.key, this.user.rememberMe);
        this.user = new AuthUserClass();
    }
}
