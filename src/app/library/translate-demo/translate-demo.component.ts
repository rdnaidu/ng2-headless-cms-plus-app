/* tslint:disable */
import { Component, Injectable, provide } from '@angular/core'; 
import { TranslateService, TranslatePipe, TRANSLATE_PROVIDERS } from 'ng2-translate/ng2-translate';
import { DropdownComponent } from '../../shared/drop-down.component';
import { DropdownValue } from '../../shared/drop-downValue';
 
@Injectable() 
@Component({ 
    selector: 'translate-demo', 
     template: require('./translate-demo.components.html'), 
     pipes: [TranslatePipe],
     directives: [DropdownComponent] 
}) 
export class TranslateDemoComponent { 
     name: string = 'World'; 
     dropdownValues: DropdownValue[];
     labelText: string ="Select Language";
     runTranslate(str: string) {
         console.log(str);
         this.translate.use(str);
     }
     constructor(public translate: TranslateService) { 
         this.dropdownValues = [new DropdownValue('en','English'),
                                 new DropdownValue('fr','French')];
         // use navigator lang if available 
         var userLang = navigator.language.split('-')[0]; 
         userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en'; 
 
 
         // this trigger the use of the french or english language after setting the translations 
         this.translate.use(userLang); 
     } 
     
     runTr($event) {
        // console.log($event.selectedValue.value);
      //   alert($event.selectedValue.value);
         var userLang = $event.selectedValue; 
         userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en'; 
         this.translate.use(userLang); 
     }
 }
