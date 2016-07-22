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
    fbAppEnabled: boolean;
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
    fbAppEnabled: false,
    fbAppConfig: {
        apiKey: 'Add Firebase key',
        authDomain: 'Add Firebase Doman',
        databaseURL: 'Firebase URL',
        storageBucket: 'Firebase storage bucket',
    }
};


export let APP_CONFIG = new OpaqueToken('app.config');
