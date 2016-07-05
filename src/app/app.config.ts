import { OpaqueToken } from '@angular/core';

import { FirebaseAppConfig } from 'angularfire2';

export interface Config {
    xpRootURL: string;
    drupalRoot: string;
    title: string;
    xpLocalURL: string;
    solrRootURL: string;
    stubURL: string;
    omdbURL: string;
    fbAppConfig: FirebaseAppConfig;
}

export const CONFIG: Config = {
    xpRootURL: 'http://10.146.201.41/Xperience',
    drupalRoot: 'http://10.146.201.41',
    title: 'Xperience Platform',
    xpLocalURL: 'http://10.146.201.41/Xperience',
    solrRootURL: 'http://10.146.201.83:8080/solr/collection1',
    stubURL: '/assets/blogs-json',
    omdbURL: 'http://www.omdbapi.com/',
    fbAppConfig: {
        apiKey: 'AIzaSyDB80HQLA-MuGym6r1dIcQcdI67eE0DI3Q',
        authDomain: 'xperience-f9109.firebaseapp.com',
        databaseURL: 'https://xperience-f9109.firebaseio.com',
        storageBucket: 'xperience-f9109.appspot.com',
    }
};


export let APP_CONFIG = new OpaqueToken('app.config');
