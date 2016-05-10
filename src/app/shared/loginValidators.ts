import {Control} from '@angular/common';

export class LoginValidators {

	static cannotContainSpace(control: Control){
			if (control.value.indexOf(' ') >= 0) {
				return { cannotContainSpace: true};
			}
			return null;
	}

}