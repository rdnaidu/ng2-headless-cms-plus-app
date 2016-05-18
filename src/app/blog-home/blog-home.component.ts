import {Component} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

import {TagListComponent} from '../tag-list/tag-list.component';
import {BlogAbstractListComponent} from '../blog-list/blog-abstract-list.component';
import {BlogCreateComponent} from '../blog-create/blog-create.component';
import {BlogSummaryListComponent} from '../blog-summary-list/blog-summary-list.component';
import {SearchService} from '../shared/search.service';

@Component({
  selector: 'blog-home',
  template: require('./blog-home.component.html'),
  styles: [require('./blog-home.scss')],
  directives: [
    ROUTER_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdButton,
    TagListComponent,
    BlogAbstractListComponent,
    BlogCreateComponent,
    BlogSummaryListComponent
  ]
})
export class BlogHomeComponent {

  items: string[] = [
    'Pepper',
    'Salt',
    'Paprika'
  ];

  contacts: any[] = [
    { name: 'Nancy', headline: 'Software engineer' },
    { name: 'Mary', headline: 'TPM' },
    { name: 'Bobby', headline: 'UX designer' }
  ];

  messages: any[] = [
    {
      from: 'Nancy',
      subject: 'Brunch?',
      message: 'Did you want to go on Sunday? I was thinking that might work.',
      image: 'https://angular.io/resources/images/bios/julie-ralph.jpg'
    },
    {
      from: 'Mary',
      subject: 'Summer BBQ',
      message: 'Wish I could come, but I have some prior obligations.',
      image: 'https://angular.io/resources/images/bios/juleskremer.jpg'
    },
    {
      from: 'Bobby',
      subject: 'Oui oui',
      message: 'Do you have Paris reservations for the 15th? I just booked!',
      image: 'https://angular.io/resources/images/bios/jelbourn.jpg'
    }
  ];

  links: any[] = [
    { name: 'Inbox' },
    { name: 'Outbox' },
    { name: 'Spam' },
    { name: 'Trash' }

  ];

  tags: any[] = [
    { name: 'Aries' },
    { name: 'Fire' },
    { name: 'Mars' },
    { name: 'Taurus' },
    { name: 'Earth' },
    { name: 'Moon' },
    { name: 'Gemini' },
    { name: 'Air' },
    { name: 'Mercury' },
    { name: 'Cancer' }
  ];

  thirdLine: boolean = false;
  infoClicked: boolean = false;

  constructor (
    public searchService: SearchService,
    public router: Router) {

  }

}
