import { Component, OnInit } from '@angular/core';
import { MdButton } from '@angular2-material/button';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { RouteConfig, ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';

import { DropdownComponent } from '../shared/drop-down.component';
import { DropdownValue } from '../shared/drop-downValue';
import { SettingsService, CMSTypes, CMSSettings } from '../shared/settings.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-settings',
  template: require('./app-settings.component.html'),
  directives: [ROUTER_DIRECTIVES, MD_LIST_DIRECTIVES, MdButton  , DropdownComponent]
})
export class AppSettingsComponent implements OnInit {
     public dropdownValues: DropdownValue[] = [];
     labelText: string = 'Select Mode';
     cmsSettings: CMSSettings;
     form: ControlGroup;
     prevType;
     currType;

     constructor(
         public settingsService: SettingsService,
         fb: FormBuilder, 
         private router: Router,
         private authService: AuthService
     ) {
         this.prevType = this.settingsService.getCmsType();
         this.currType = this.settingsService.getCmsType();
         this.form = fb.group({
			mode: ['', Validators.required],
			host: ['', Validators.required],
            port: ['', Validators.required]
		});
     }

     ngOnInit() {

       this.cmsSettings = this.settingsService.getCmsSettings();
       for (let value in CMSTypes) {
                let selected: string = '';
                let option: any;
                var isValueProperty = parseInt(value, 10) >= 0
                if (isValueProperty) {
                    if (value == this.settingsService.getCmsType()) {
                        selected = 'selected';
                    } else {
                        selected ='';
                    }
                    let option = new DropdownValue(value,CMSTypes[value],selected);
                    this.dropdownValues.push(option);
                }
        }

     }
     onSelect(value) {
        this.prevType = this.settingsService.getCmsType();
        this.currType = value;
        this.settingsService.setCmsType(value);
     }

     save() {
         console.log('save settings');
       this.settingsService.save(this.cmsSettings);
       if (this.prevType != this.currType) {
           this.authService
            .logout()
            .subscribe();
       }
       this.router.navigate(['Home']);
     }
}
