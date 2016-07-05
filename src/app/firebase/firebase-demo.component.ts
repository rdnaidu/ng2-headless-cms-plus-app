import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {MdButton} from '@angular2-material/button/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card/card';

@Component({
  selector: 'firebase-demo',
   directives: [
    ...ROUTER_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdButton
  ],
  styleUrls: ['./firebase-demo.component.scss'],
  templateUrl: './firebase-demo.component.html'
}
)
export class FirebaseDemoComponent {

  constructor(public af: AngularFire) {

  }

  login() {

    this.af.auth.login().then((value) => {
      console.log(value); // photoURL, displayName, email
    }
    ).catch((error) => {
            console.log(error);
        });
  }

  logout() {
    this.af.auth.logout();
  }
}
