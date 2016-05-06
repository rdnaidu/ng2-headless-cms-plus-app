import {Component} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';

@Component({
    selector: 'sidenav-demo',
    template: require('./sidenav-demo.html'),
    styles: [require('./sidenav-demo.scss')],
    directives: [MD_SIDENAV_DIRECTIVES, MdButton]
})
export class SidenavDemo { }
