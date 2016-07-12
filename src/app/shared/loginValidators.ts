import { FormControl } from '@angular/forms';

export class LoginValidators {

	static cannotContainSpace(control: FormControl): { [s: string]: boolean }  {
			if (control.value.indexOf(' ') >= 0) {
				return { cannotContainSpace: true};
			}
			return undefined;
	}

}
