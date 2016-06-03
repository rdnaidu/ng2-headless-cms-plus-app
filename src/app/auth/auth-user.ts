import { Injectable } from '@angular/core';
import { Publications } from '../blog-list/blog';
import { Address, User, UserClass } from '../users/user';

export interface AuthUser {
    isLoggedIn: boolean;
    rememberMe: boolean;
    token: string;
    data: User
}

export class AuthUserClass {
    isLoggedIn = false;
    rememberMe = false;
    token = '';
    data = new UserClass();
}

@Injectable()
export class BasicAuth {
    private _data = {
        "admin": {
            "password": "admin",
            "uid": 1
        },
        "alex-eagle": {
            "password": "alex-eagle",
            "uid": 3
        },
        /*"alex-rickabaugh": {
            "password": "alex-rickabaugh",
            "uid": 3
        },*/
        "alex-wolfe": {
            "password": "alex-wolfe",
            "uid": 4
        },
        "ali": {
            "password": "ali",
            "uid": 5
        },
        "brad-green": {
            "password": "brad-green",
            "uid": 6
        },
        "brian-ford": {
            "password": "brian-ford",
            "uid": 7
        },
        "david-east": {
            "password": "david-east",
            "uid": 8
        },
        "deborah": {
            "password": "deborah",
            "uid": 9
        },
        /*"elad-bezalel": {
            "password": "elad-bezalel",
            "uid": 9
        },
        "filipe-silva": {
            "password": "filipe-silva",
            "uid": 9
        },*/
        "senthil": {
            "password": "senthil",
            "uid": 2
        }
    };
    
    checkUser(name, password) {
        let user;
        if (this._data[name]) {
            user = this._data[name];
            if (user.password == password) {
                return user;
            }
        }
        
        return false;
    }
}