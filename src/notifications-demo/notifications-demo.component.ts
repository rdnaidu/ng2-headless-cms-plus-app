import {Component} from "angular2/core";
import {NotificationsService} from "angular2-notifications/components";
import {SimpleNotificationsComponent} from "angular2-notifications/components";
import {DropdownComponent} from '../shared/drop-down.component';
import {DropdownValue} from '../shared/drop-downValue';

@Component({
    selector: 'notifications-demo',
    directives: [SimpleNotificationsComponent,DropdownComponent],
    providers: [NotificationsService],
    template: ` 
         <form class="form-group" (ngSubmit)="create()"> 
             <div> 
                 <label>Title</label> 
                 <p>The title of the notification.</p> 
                 <input class="form-control" type="text" [(ngModel)]="title"> 
             </div> 
             <div> 
                 <label>Content</label> 
                 <p>The content of the notification.</p> 
                 <input class="form-control" type="text" [(ngModel)]="content"> 
             </div> 
             <div> 
                 <label>Type</label> 
                 <drop-down [labelText]="labelText" [values]="dropdownValues" (select)="selectItem($event)"></drop-down>
             </div> 
             <button class="btn btn-primary" type="submit">Create Notification</button> 
         </form> 
         <button class="btn btn-primary" (click)="removeAll()">Clean all notifications</button> 
         <simple-notifications [options]="options" (onCreate)="onCreate($event)" (onDestroy)="onDestroy($event)"></simple-notifications> 
         <button class="btn btn-primary" (click)="withOverride()">with override</button> 
         <button class="btn btn-primary" (click)="withHtml()">with html</button> 
<!--          
         <form class="form-group" (ngSubmit)="cleanSingle()"> 
             <input class="form-control" type="text" [(ngModel)]="deleteId"> 
             <button class="btn btn-primary" type="submit">Delete</button> 
         </form> -->
     `
})
export class NotificationsDemoComponent {
    dropdownValues: DropdownValue[];
    labelText: string="The type of the notification.";
    constructor(
        private _service: NotificationsService
    ) { 
        this.type="success"; 
         this.dropdownValues = [new DropdownValue('success','Success'),
                                 new DropdownValue('error','Error'),
                                 new DropdownValue('alert','Alert'),
                                 new DropdownValue('info','Info'),
                                 new DropdownValue('bare','Bare')
                                 ];
    }

    public title: string = 'just a title';
    public content: string = 'just content';
    public type: string;

    public deleteId: string;

    public temp: boolean[] = [true, false];

    public options = {
        timeOut: 5000,
        lastOnBottom: true,
        clickToClose: true,
        maxLength: 0,
        maxStack: 7,
        showProgressBar: true,
        pauseOnHover: true,
        preventDuplicates: true,
        preventLastDuplicates: false
    };

    selectItem($event) {
        this.type=$event.selectedValue;
    }
    create() {
       // console.log(this.type);
        
        switch (this.type) {
            case 'success':
                this._service.success(this.title, this.content);
                break;
            case 'alert':
                this._service.alert(this.title, this.content);
                break;
            case 'error':
                this._service.error(this.title, this.content);
                break;
            case 'info':
                this._service.info(this.title, this.content);
                break;
            case 'bare':
                this._service.bare(this.title, this.content);
                break;
        }
    }

    withOverride() { this._service.create('pero', 'peric', 'success', { timeOut: 0, clickToClose: true, maxLength: 3, showProgressBar: false, theClass: 'overrideTest' }); }

    private html = `<p>Test</p><p>Another test</p>`;
    withHtml() { this._service.html(this.html, 'success'); }


    removeAll() { this._service.remove() }


    onCreate(event) {
        console.log(event);
    }


    onDestroy(event) {
        console.log(event);
    }

    cleanSingle() {
        console.log(this.deleteId);
        this._service.remove(this.deleteId);
    }
}
