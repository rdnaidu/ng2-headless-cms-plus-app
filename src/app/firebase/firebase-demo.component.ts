import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'firebase-demo',
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
