import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';
import { SpinnerComponent } from '../shared/spinner.component';
import 'rxjs/add/operator/map';

@Component({
  selector: 'people',
  styleUrls: ['./people.component.scss'],
  templateUrl: './people.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [SpinnerComponent]
})
export class PeopleComponent {
  people: Observable<any[]>;
  isLoading: boolean;
  constructor(public af: AngularFire) {
    this.isLoading = true;
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

  remove(person) {
    //alert(`${person.$key}`);

    const itemObservable = this.af.database.object(`/todos/${person.$key}`);
    itemObservable.remove()
      .then( _ => {
      //  console.log('success');
        this.removePerson(person);
      })
      .catch(err => console.log(err, 'Error in deletion'));

  }

  removePerson(person) {
    const itemObservable = this.af.database.object(`/people/${person.$key}`);
     itemObservable.remove()
      .then( _ => {
      //  console.log('success');
        this.removePerson(person);
      })
      .catch(err => console.log(err, 'Error in deletion'));
  }

  removeTodo(person, todo) {
  //    alert(`${todo.$key}`);
   const itemObservable = this.af.database.object(`/todos/${person.$key}/${todo.$key}`);
    itemObservable.remove()
      .then( _ => {
     //   console.log('success');
      })
      .catch(err => console.log(err, 'Error in deletion'));
  }
}
