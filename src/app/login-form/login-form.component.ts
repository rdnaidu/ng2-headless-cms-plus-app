import { Component, Output , Input, EventEmitter } from '@angular/core';
import { LoginValidators } from '../shared/loginValidators';
import { MdCheckbox } from '@angular2-material/checkbox';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';


@Component({
    selector: 'login-form',
    template: require('./login-form.component.html'),
	directives: [MdCheckbox, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class LoginFormComponent {
		isIndeterminate: boolean = false;
  		isChecked: boolean = false;
  		isDisabled: boolean = false;
  		alignment: string = 'start';
		loginForm: FormGroup;
        @Output() formEvent = new EventEmitter();
        @Input() error: boolean;
		@Input() isLoading: boolean;
		constructor(private fb: FormBuilder) {

			this.loginForm = fb.group ({
				username: ['', Validators.compose(
					[Validators.required, LoginValidators.cannotContainSpace]
					)],
				password: ['', Validators.required],
				remember: ['']
			});
		}

		login() {
			/*var result = authService.login(this.form.value)

			this.form.find('username').setErrors({
				invalidLogin: true	
			});
			*/
            this.formEvent.emit( { loginForm: this.loginForm.value});
		}
}
