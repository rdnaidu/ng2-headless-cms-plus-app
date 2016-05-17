import {Observable} from 'rxjs/Rx';
import {Observer} from 'rxjs/Observer';
import {Injectable} from '@angular/core';
/* Authentication Service for
      1) Storing the current auth token (if loggedIn)
      2) Handle login and logout methods
*/
@Injectable()
export class AuthService {
    public loggedIn;
    token: string;
    public username: String;
    public avatar: string;
    constructor() {
        this.loggedIn = false;
        localStorage.removeItem('token');
        this.token = localStorage.getItem('token');
        this.avatar = 'https://angular.io/resources/images/bios/alex-eagle.jpg';
    }

    public login(username?: String, password?: String): Observable<string> {
        /*
            // sample code for a login server call

            return this.http.post('/auth/login', JSON.stringify({
                username: username,
                password: password
            }), {
                headers: new Headers({
                'Content-Type': 'application/json'
                })
            })
            .map((res : any) => {
                let data = res.json();
                this.token = data.token;
                localStorage.setItem('token', this.token);
            });

        */

        this.username = username;
        // simulate successfull login call
        if (username === 'alex-eagle' && password === 'alex-eagle') {
            this.token = 'token'; // dummy token
            localStorage.setItem('token', this.token);
            this.loggedIn = true;
            return Observable.of('token');
        }
        this.loggedIn = false;
        return Observable.throw('authentication failure');
    }

    public logout() {
        /*
            // sample code for log out api call

            return this.http.get(this.config.serverUrl + '/auth/logout', {
                headers: new Headers({
                    'x-security-token': this.token
                })
            })
            .map((res : any) => {
                this.token = undefined;
                localStorage.removeItem('token');
            });
     */

        this.loggedIn = false;
        this.token = undefined;
        this.username = undefined;
        localStorage.removeItem('token');

        return Observable.of(true);
    }

    public check() {
      //  return Observable.of(this.loggedIn);
      return Observable.of(!!localStorage.getItem('token'));
    }

}
