import { Injectable } from '@angular/core';

export class CMSSettings {
    mode: any;
    host: string;
    port: number;
}

export enum CMSTypes {
        Stub,
        Drupal
    }

/* Settings Service for
      1) Storing the settings for app
*/
@Injectable()
export class SettingsService {

    cmsSettings = new CMSSettings();

    constructor() {
        this.cmsSettings.mode = CMSTypes.Stub;
        this.cmsSettings.host = 'localhost';
        this.cmsSettings.port = 8080;
    }

    getCmsSettings(): CMSSettings {
        return this.cmsSettings;
    }
    setCmsType(cmsType: any) {
        this.cmsSettings.mode = cmsType;
    }

    getCmsType(): any {
        return this.cmsSettings.mode;
    }

    setCmsHost(cmsHost: string) {
        this.cmsSettings.host = cmsHost;
    }

    getCmsHost(): string {
        return this.cmsSettings.host;
    }

    setCmsPort(cmsPort: number) {
        this.cmsSettings.port = cmsPort;
    }

    getCmsPort(): number {
        return this.cmsSettings.port;
    }
}
