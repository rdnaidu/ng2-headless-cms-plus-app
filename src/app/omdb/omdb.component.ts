import {Component, OnInit} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

import { OmdbService } from './omdb.service';
import { OmdbSearchParams, OmdbBySearch, BySearchResult } from './omdb';

@Component({
    selector: 'omdb-component',
    template: require('./omdb.component.html'),
    directives: [   ROUTER_DIRECTIVES, 
                    MD_LIST_DIRECTIVES,
                    MdButton,
                    PAGINATION_DIRECTIVES],
    providers: [OmdbService]
})
export class OmdbComponent implements OnInit {
    title = 'Search';
    form: ControlGroup;
    params = new OmdbSearchParams();
    result: OmdbBySearch;
    searchResult: boolean;
    public currentPage: number = 1;
    public maxSize: number = 10;
    public itemsPerPage: number = 10;
    // omdbResults: BySearchResult[];


    constructor(private _service: OmdbService,
        fb: FormBuilder,
        private router: Router
    ) {

        this.form = fb.group({
            s: ['', Validators.required]
        });

    }

    search() {
        //console.log(this.params);
        this.searchResult = false;
        if (this.params.s.length == 0)
            return;
        this.loadSearch()
    }
    ngOnInit() {

    }
    
    public pageChanged(event: any): void {
     //   alert(event.page);
        this.params.page = event.page;
        this.loadSearch();
    }   
    
    private loadSearch() {
        this._service.getDetails(this.params)
            .subscribe(
            result => {
            this.result = result;
             //   console.log(this.result.Search)
                this.searchResult = true;
            },
            error => {
                //	this.errorMessage = 'Unable able to connect';
                //	this.isLoading = false;
                this.searchResult = true;
            },
            () => {
                //	this.isLoading = false;
            });
    }
 
}
