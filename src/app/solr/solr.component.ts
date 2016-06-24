import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    ControlGroup,
    Validators,
    CORE_DIRECTIVES,
    FORM_DIRECTIVES
} from '@angular/common';

import { MdButton } from '@angular2-material/button';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { PAGINATION_DIRECTIVES, TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { SpinnerComponent } from '../shared/spinner.component';
import { SolrMultiselectComponent } from './solr-multiselect.component';
import { SolrService } from './solr.service';

@Component({
    selector: 'solr-search',
    template: require('./solr.component.html'),
    directives: [
        SolrMultiselectComponent,
        MD_LIST_DIRECTIVES,
        MdButton,
        PAGINATION_DIRECTIVES,
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        TYPEAHEAD_DIRECTIVES,
        SpinnerComponent
    ]
})
export class SolrComponent implements OnInit {
    public title: string = 'Solr Search';
    public form: ControlGroup;
    public result: any = {};
    public searchResult: boolean = false;
    public isLoading: boolean = false;
    public data = {
        category: [],
        eventname: '',
        start: 0,
        page: 1,
        rows: 10,
        size: 5
    };
    public typeaheadLoading: boolean = false;
    public typeaheadNoResults: boolean = false;

    private _cache: any;
    private _prevContext: any;

    public getContext(): any {
        return this;
    }
    constructor(
        private fb: FormBuilder,
        private solrService: SolrService) {
        this.form = fb.group({
            category: [''],
            eventname: ['']
        });
    }

    getData($event) {
        console.log('event', $event);
        this.data.category = $event;
    }

    public getAsyncData(context: any): Function {
        let self = this;
        if (this._prevContext === context) {
            return this._cache;
        }

        this._prevContext = context;
        let f: Function = function (): Promise<Object[]> {
            let p: Promise<Object[]> = self.getEventnames();
            return p;
        };
        this._cache = f;
        return this._cache;
    }

    getEventnames(): Promise<Object[]> {
        return this.solrService.solrAutoSuggest(this.data.eventname);
    }
    changeTypeaheadLoading($event) {
        this.typeaheadLoading = $event;
    }
    changeTypeaheadNoResults($event) {
        this.typeaheadNoResults = $event;
    }
    typeaheadOnSelect($event) {
        console.log('Selected value: ', $event.item);
        // this.data.category = $event.item;
    }

    search() {
        this.searchResult = false;
        this.isLoading = false;
        this.loadSearch(false);
    }

    public pageChanged(event: any): void {
        this.data.page = event.page;
        this.data.start = (event.page - 1) * this.data.rows;
        this.loadSearch(true);
    }
    ngOnInit() {
        this.loadSearch(false);
    }

    reset($event) {
        $event.preventDefault();
        this.data.category.length = 0;
        this.data.eventname = '';
    }
    private loadSearch(pageChanged: boolean) {
        this.isLoading = true;
        if (!pageChanged) {
            this.data.page = 1;
            this.data.start = 0;
        }
        this.solrService.getEvents(this.data)
            .subscribe(
            result => {
                this.result = result;
                this.searchResult = true;
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.searchResult = false;
            },
            () => {
                this.isLoading = false;
            });
    }
}
