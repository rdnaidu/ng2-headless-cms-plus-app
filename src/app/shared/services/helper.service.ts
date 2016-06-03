import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {
    parseSrcFromHtml(html: string) {
        let tHtml = html || '';
        var result;
        result = html.match(/src="(.+?)"/ig) || [];
        result = result.length ? result.join(',').replace(/"|src=/g, '') : "";
        result = (result == "") ? [] : result.split(',');
        return result || [];
    }
}