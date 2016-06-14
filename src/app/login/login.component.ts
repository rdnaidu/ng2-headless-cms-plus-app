import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { LoginFormComponent } from '../login-form/login-form.component';
import { Router } from '@angular/router-deprecated';

@Component({

    selector: 'login',
    directives: [LoginFormComponent],
    template: `
   <!-- Logged in: {{ auth.loggedIn }}<br> -->
    <br>
    <login-form (formEvent)="login($event)" *ngIf="!auth.loggedIn" [error]="error"></login-form>
    <div class="container" *ngIf="auth.loggedIn">
        <div class="row">
            <div>
                <label>User : {{auth.username}}</label>&nbsp;
                <button class="btn btn-primary" (click)="logout()">Logout</button>
            </div>
        </div>
    </div>
    
  `
})

export class LoginComponent implements OnInit {
    error: boolean = false;

    constructor(public auth: AuthService,
                public router: Router) {
        if (this.auth.user.isLoggedIn) {
            this.router.navigate(['Home']);
        }
    }

    ngOnInit() {
        if (this.auth.user.isLoggedIn) {
            this.router.navigate(['Home']);
        }
    }

    login($event) {
      //  console.log($event.loginForm.username + ":" + $event.loginForm.password);
      // this.auth.login($event.loginForm.username,$event.loginForm.password);

        this.auth.login($event.loginForm.username, $event.loginForm.password)
            .subscribe(
                (token: any) => this.router.navigate(['Home']),
                (error) => {
                     this.error = true;
                }
            );
    }

    logout() {
        this.auth.logout()
        .subscribe(
            () => this.router.navigate(['Home'])
        );
    }

}
