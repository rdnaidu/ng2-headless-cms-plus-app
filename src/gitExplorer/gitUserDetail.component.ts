import {Component, ReflectiveInjector, Injector, OnInit} from 'angular2/core';
import {Http} from 'angular2/http';
import {ROUTER_DIRECTIVES,
        Router,
        RouteParams,
        RouteConfig,
        OnActivate,
        ComponentInstruction} from 'angular2/router';
import {GitUserFollowersComponent} from './GitUserFollowers.component';
import {GitUser} from './gitUser';


@Component({
    directives: [ROUTER_DIRECTIVES],
    template: require('./gitUserDetail.component.html'),
    styles: [` 
     img { width: 100px; margin-bottom: 10px; } 
   `]
})
@RouteConfig([
    { path: '/followers', component: GitUserFollowersComponent, name: 'GitUserFollowers' }
])
export class GitUserDetailComponent implements OnActivate {
    params: RouteParams;
    userLogin: string;
    userData = new GitUser();
    error: boolean;
    errorDetails: string;

    constructor(public http: Http,
                params: RouteParams,
                injector: Injector, private _router: Router) {
       // TODO - Fix this
       // let reflectiveInjector: ReflectiveInjector = <ReflectiveInjector>injector;            
       // this.params = reflectiveInjector.parent.get(RouteParams);
        this.userLogin = 'null'; // this.params.get('userLogin');
    }


    routerOnActivate(to: ComponentInstruction, from: ComponentInstruction) {
        return new Promise((resolve) => {
            this.http.get(`http://api.github.com/users/${this.userLogin}`)
                .map(response => response.json())
                .subscribe(
                    data => {
                        this.userData = data;
                        this.error = false;
                        console.log(data);
                        resolve(true);
                    }
                    ,
                    err => {
                        // console.log(err)
                        this.error = true;
                        this.errorDetails = err.message;
                        resolve(false);
                    }
                );
        });
    }

    getFollowers() {
        this._router.navigate(['GitUserFollowers', { userLogin: this.userLogin }]);
    }
}
