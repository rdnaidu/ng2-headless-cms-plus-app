import { OpaqueToken } from '@angular/core';

export interface Config {
    xpRootURL: string;
    drupalRoot: string;
    title: string;
    xpLocalURL: string;
    solrRootURL: string;
    stubURL: string;
    omdbURL: string;
}

export const CONFIG: Config = {
    xpRootURL: 'http://10.146.201.41/Xperience',
    drupalRoot: 'http://10.146.201.41',
    title: 'Xperience Platform',
    xpLocalURL: 'http://10.146.201.41/Xperience',
    solrRootURL: 'http://10.146.201.83:8080/solr/collection1',
    stubURL: '/assets/blogs-json',
    omdbURL: 'http://www.omdbapi.com/'
};

export let APP_CONFIG = new OpaqueToken('app.config');
