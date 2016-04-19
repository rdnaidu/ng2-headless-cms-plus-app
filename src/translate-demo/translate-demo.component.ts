import {Component, Injectable, provide} from 'angular2/core'; 
import {TranslateService, TranslatePipe, TRANSLATE_PROVIDERS} from 'ng2-translate/ng2-translate';
 
 
@Injectable() 
@Component({ 
    selector: 'translate-demo', 
     template: ` 
         <h1>Hello, {{name}}!</h1> 
         Say "<b>{{ 'HELLO' | translate:'{value: "world"}' }}</b>" to: <input [value]="name" (input)="name = $event.target.value"> 
         <br/> 
         Change language: 
         <select (change)="translate.use($event.target.value)"> 
             <option *ngFor="#lang of ['fr', 'en']" [selected]="lang === translate.currentLang">{{lang}}</option> 
         </select> 
     `, 
     pipes: [TranslatePipe] 
}) 
export class TranslateDemoComponent { 
     name: string = 'World'; 
 
 
     constructor(public translate: TranslateService) { 
         // use navigator lang if available 
         var userLang = navigator.language.split('-')[0]; 
         userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en'; 
 
 
         // this trigger the use of the french or english language after setting the translations 
         translate.use(userLang); 
     } 
 }
 