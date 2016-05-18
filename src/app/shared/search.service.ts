import {Injectable} from '@angular/core';
/* Search Service for
      1) Storing the search string
      2) Will be extended to once search is implemented
*/
@Injectable()
export class SearchService {
    public searchText: string;

    constructor() {
        this.clearSearch();
    }

    setSearchText(searchText: string) {
        this.searchText = searchText;
    }

    clearSearch() {
        this.searchText = '';
    }
}
