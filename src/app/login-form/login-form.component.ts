import { Component, Output , Input, EventEmitter } from '@angular/core';
import { ControlGroup, Control, Validators, FormBuilder } from '@angular/common';
import { LoginValidators } from '../shared/loginValidators';
import { MdCheckbox } from '@angular2-material/checkbox';

@Component({
    selector: 'login-form',
    template: require('./login-form.component.html'),
	directives: [MdCheckbox]
})
export class LoginFormComponent {
		isIndeterminate: boolean = false;
  		isChecked: boolean = false;
  		isDisabled: boolean = false;
  		alignment: string = 'start';
		form: ControlGroup;
        @Output() formEvent = new EventEmitter();
        @Input() error: boolean;
		@Input() isLoading: boolean;
		constructor(fb: FormBuilder) {

			this.form = fb.group ({
				username: ['', Validators.compose(
					[Validators.required, LoginValidators.cannotContainSpace]
					), undefined
					],
				password: ['', Validators.required],
				remember: ['', undefined, undefined]
			});
		}
		login() {
			/*var result = authService.login(this.form.value)

			this.form.find('username').setErrors({
				invalidLogin: true	
			});
			*/
            this.formEvent.emit( { loginForm: this.form.value});
		}
}
