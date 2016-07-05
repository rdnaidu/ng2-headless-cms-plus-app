import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'people',
  styleUrls: ['./people.component.scss'],
  templateUrl: './people.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleComponent {
  people: Observable<any[]>;
  constructor(public af: AngularFire) {
    this.people = af.database.list('/people')
    .map((people) => {
      return people.map((person) => {
        person.todos = af.database.list(`/todos/${person.$key}`);
        return person;
      });
    });

  }

  ngOnInit() {
    console.log('hello `People` component');
  }
}
