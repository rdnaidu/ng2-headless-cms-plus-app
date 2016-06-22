import { Injectable } from '@angular/core';

import { Modal } from 'angular2-modal/plugins/bootstrap';

/**
 * Async modal dialog service
 * ModalService makes this app easier to test by faking this service.
 */
@Injectable()
export class ModalService {

    constructor(public modal: Modal) {

    }
    /**
     * Ask user to confirm an action. `message` explains the action and choices.
     * Returns promise resolving to `true`=confirm or `false`=cancel
     */
    confirm(message?: string) {
        return new Promise<boolean>(resolve => {
            return resolve(
                window.confirm(message || 'Is it OK?')
                );
        });
    };
}