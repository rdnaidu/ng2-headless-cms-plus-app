import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
    set (key, value, isLocal = false) {
        if (isLocal) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    }
    
    get (key, isLocal = false) {
        if (isLocal) {
            return JSON.parse(localStorage.getItem(key));
        } else {
            return JSON.parse(sessionStorage.getItem(key));
        }
    }
}