import { OpaqueToken } from '@angular/core';

export interface Config {
    apiEndPoint: string;
    apiShort: string;
    title: string;
}

export const CONFIG: Config = {
    apiEndPoint: 'http://10.146.201.72/Xperience',
    apiShort: 'http://10.146.201.72',
    title: 'Xperience Platform'
}

export let APP_CONFIG = new OpaqueToken('app.config');