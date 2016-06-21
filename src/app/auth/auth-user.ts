import { Injectable } from '@angular/core';
import { Publications } from '../blog-list/blog';
import { Address, User, UserClass } from '../users/user';

export interface AuthUser {
    isLoggedIn: boolean;
    rememberMe: boolean;
    state: string;
    token: string;
    data: User;
}

export class AuthUserClass {
    isLoggedIn = false;
    state = 'loggedOut';
    rememberMe = false;
    token = '';
    data = new UserClass();
}

@Injectable()
export class BasicAuth {
    private _data = {
        'admin': {
            'password': 'admin',
            'uid': 1,
            'refresh_token': 'dy0igwJy9ZhfdCBDPugfdgmxrnnTMifRuMcsh_Gw5cs'
        },
        'senthil': {
            'password': 'senthil',
            'uid': 2,
            'refresh_token': '5Vd0u3It-w5zxgF0UByHwP-oq43szBBbV3E8GxW7fjs'
        },
        'alex-eagle': {
            'password': 'alex-eagle',
            'uid': 3,
            'refresh_token': 'QenOk2dEbMxj24V4eDGBymvDv1Y-n_T-BeJUGGw7mqw'
        },
        'alex-wolfe': {
            'password': 'alex-wolfe',
            'uid': 4,
            'refresh_token': '0IjmGGXd1O6eKeY129XNx59qnbmtHQQXQBidPp4h1pU'
        },
        'ali': {
            'password': 'ali',
            'uid': 5,
            'refresh_token': 'AupZ9vTTeTg2-yph9ltelbHo4tng3eyLAucp8OyvRZw'
        },
        'brad-green': {
            'password': 'brad-green',
            'uid': 6,
            'refresh_token': 'm11eTpp7NedUb1r7aYbVbdeunjwxzdZS4ah7wdqNcrs'
        },
        'brian-ford': {
            'password': 'brian-ford',
            'uid': 7,
            'refresh_token': '0Gn9XLN-eUrx3MTMN_r8pfjaGU2qae6UOQ96O-PJaKA'
        },
        'david-east': {
            'password': 'david-east',
            'uid': 8,
            'refresh_token': 'Y2h65iAt_ShZCzBxYYX6c_0zUyClRYW3AJhpLh8i65Q'
        },
        'deborah': {
            'password': 'deborah',
            'uid': 9,
            'refresh_token': 's-xmMndseXdtjhx-RxzHyc7A9cQaLZu4LJOPH-PEgvQ'
        }
    };

    checkUser(name, password) {
        let user = this.getUser(name);
        if (user) {
            if (user.password === password) {
                return user;
            }
        }

        return false;
    }
    
    getUser(name) {
        if (this._data[name]) {
            return this._data[name];
        }
        
        return false;
    }
}
