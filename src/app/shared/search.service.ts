import { Injectable } from '@angular/core';

import { SearchJSON } from '../blog-list/blog';
/* Search Service for
      1) Storing the search string
      2) Will be extended to once search is implemented
*/
@Injectable()
export class SearchService {
    public searchJSON: SearchJSON = <SearchJSON>{};

    constructor() {
        this.clearSearch();
    }

    setSearchJSON(searchJSON: SearchJSON) {
        this.searchJSON = searchJSON;
    }

    clearSearch() {
        this.clearTag();
        this.clearTitle();
    }

    clearTitle() {
        this.searchJSON.title = '';
    }

    clearTag() {
        this.searchJSON.tag = '';
    }
}
