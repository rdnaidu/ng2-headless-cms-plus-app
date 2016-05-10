/* tslint:disable */
import {Component, OnInit} from '@angular/core';
import {Router,RouterLink} from '@angular/router-deprecated';

import {PhoneService} from './phone.service';
import {SpinnerComponent} from '../../shared/spinner.component';
import {AlertComponent} from '../../shared/alert.component';
import {SearchPipe} from './search.pipe';

@Component({
    selector: 'phones',
	template: require('./phones.component.html'),
	providers: [PhoneService],
	directives: [RouterLink,SpinnerComponent,AlertComponent],
    pipes: [SearchPipe]
})

export class PhonesComponent implements OnInit{

	phones: any[];
	isLoading=true;
	phoneServiceError=false;
	errorMessage;

	constructor(private _service: PhoneService) {

	}

	ngOnInit() {
		this._service.getPhones()
			.subscribe(
				phones => this.phones = phones,
				error => {
					this.phoneServiceError = true;
					this.errorMessage = "Unable able to connect";
					this.isLoading = false;
				},
				() => {
					this.isLoading = false;
				});
	}
	
}
