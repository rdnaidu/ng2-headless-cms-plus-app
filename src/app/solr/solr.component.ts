import { Component } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';

import { MdButton } from '@angular2-material/button';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { SpinnerComponent } from '../shared/spinner.component';
import { SolrTypeaheadComponent } from './solr-typeahead.component';

@Component({
    selector: 'solr-search',
    template: require('./solr.component.html'),
    directives: [
        SolrTypeaheadComponent,
        MD_LIST_DIRECTIVES,
        MdButton,
        PAGINATION_DIRECTIVES,
        SpinnerComponent
    ]
})
export class SolrComponent {
    title: string = 'Solr Search';
    form: ControlGroup;
    constructor(private fb: FormBuilder) {
        this.form = fb.group({
            category: [''],
            eventname: ['']
        });
    }
}
