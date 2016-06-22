import { Component,
    OnInit,
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Observable, Scheduler } from 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { AuthService } from '../auth/auth.service';
import { MenuItem } from './menu-item';
import { MdButton, MdAnchor } from '@angular2-material/button';
import { BlogTypeaheadComponent } from '../blog-typeahead/blog-typeahead.component';
import { SearchService } from '../shared/search.service';
declare var jQuery: any;


@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    directives: [ROUTER_DIRECTIVES, MdButton, MdAnchor, BlogTypeaheadComponent],
    styleUrls: ['./navbar.component.scss'],
    animations: [
        trigger('loginState', [
            state('loggedIn', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('loggedIn => loggedOut', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.2s ease-in')
            ])
        ])

    ]
})
export class NavBarComponent implements OnInit {
    menuItems: MenuItem[] = [
        new MenuItem('users', '/users', 'Users', 'fa fa-users', true),
        new MenuItem('omdb', '/omdb', 'Omdb APIs', 'fa fa-video-camera', false),
        new MenuItem('solr', '/solr', 'Solr APIs', 'fa fa-search', false),
        new MenuItem('blogusers', '/blogusers', 'Blog Users', 'fa fa-users', false)
        /*,
        new MenuItem("posts","Posts","Posts"),
        new MenuItem("phones","Phones","Phones"),
        new MenuItem("git-explorer","GitExplorer","Git User Explorer"),
        new MenuItem("tweets","Tweets","Tweets"),
        new MenuItem("material","Material","Material")    */
    ];
    constructor(
        public searchService: SearchService,
        public auth: AuthService,
        private _router: Router,
        private _route: ActivatedRoute) {
           
    }

    ngOnInit() {

    }

    isCurrentRoute(route) {
       console.log(this._router);
       console.log(this._route);
    }

    // collapse Navbar once clicked
    clicked() {
        jQuery('.navbar-collapse.in').collapse('hide');
    }

    logout() {
        this.auth.logout()
            .subscribe(res => {
                console.log(res);
                this._router.navigate(['Home']);
            });
    }
}
