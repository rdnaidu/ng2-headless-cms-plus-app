import { Publications } from '../blog-list/blog';

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}

export interface User {
    uid: number;
    name: string;
    username?: string;
    avatar: string;
    width: number;
    height: number;
    alt: string;
    typeof: string;
    mail: string;
    roles: string;
    timezone: string;
    phone?: string;
    address?: Address
    publications?: Publications[]
}

export class UserClass implements User {
    uid = 0;
    name = '';
    username = '';
    avatar = '';
    width = 0;
    height = 0;
    alt = '';
    typeof = '';
    mail = '';
    roles = '';
    timezone = '';
    phone = '';
    address = {
        street: '',
        suite: '',
        city: '',
        zipcode: ''
    } as Address;
    publications = [] as Publications[];
}
