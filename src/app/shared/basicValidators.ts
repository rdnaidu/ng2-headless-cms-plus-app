/* tslint:disable */
import {Control} from '@angular/common';

export class BasicValidators {

    static email(control: Control) {

    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = regEx.test(control.value);

        return valid ? undefined : { email: true };

    }
}
