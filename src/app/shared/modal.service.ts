import { Injectable } from '@angular/core';
// TODO: Disabled angular2-modal due to feature change in Rc4 for BROWSER_PROVIDERS 
// import { Modal } from 'angular2-modal/plugins/bootstrap';

/**
 * Async modal dialog service
 * ModalService makes this app easier to test by faking this service.
 */
@Injectable()
export class ModalService {

 /*   constructor(public modal: Modal) {

    }*/
    /**
     * Ask user to confirm an action. `message` explains the action and choices.
     * Returns promise resolving to `true`=confirm or `false`=cancel
     */
    confirm(message?: string) {
  //      return this.modalDialog(message);
        return new Promise<boolean>(resolve => {
            return resolve(
                window.confirm(message || 'Is it OK?')
            );
        });
    };


 /*   modalDialog(message?: string): Promise<boolean> {
        let dialogResult: boolean;
        let dialog = this.modal.confirm()
            // .size('sm')
            .message(message || 'Is it OK?')
            .title('Confirm')
            .isBlocking(true)
            .open();

       let res = new Promise <boolean> (

           function(resolve, reject) {
               dialog
            .then((d) => d.result.then((result) => {
                dialogResult = result;
                resolve(dialogResult);
            },
                () => {
                   dialogResult = false;
                   resolve(dialogResult);
                })
            ).catch(error => console.log(error));
           }

       );

       return res;
    }*/
}
