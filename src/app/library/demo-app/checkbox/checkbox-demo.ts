import { Component } from '@angular/core';
import { MdCheckbox } from '@angular2-material/checkbox';

interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}

@Component({
  selector: 'md-checkbox-demo-nested-checklist',
  styles: [`
    li {
      margin-bottom: 4px;
    }
  `],
  template: require('./nested-checklist.html'),
  directives: [MdCheckbox]
})
class MdCheckboxDemoNestedChecklist {
  tasks: Task[] = [
    {
      name: 'Reminders',
      completed: false,
      subtasks: [
        { name: 'Cook Dinner', completed: false },
        { name: 'Read the Material Design Spec', completed: false },
        { name: 'Upgrade Application to Angular2', completed: false }
      ]
    },
    {
      name: 'Groceries',
      completed: false,
      subtasks: [
        { name: 'Organic Eggs', completed: false },
        { name: 'Protein Powder', completed: false },
        { name: 'Almond Meal Flour', completed: false }
      ]
    }
  ];

  allComplete(tasks: Task[]): boolean {
    return tasks.every(t => t.completed);
  }

  someComplete(tasks: Task[]): boolean {
    const numComplete = tasks.filter(t => t.completed).length;
    return numComplete > 0 && numComplete < tasks.length;
  }

  setAllCompleted(tasks: Task[], completed: boolean) {
    tasks.forEach(t => t.completed = completed);
  }

  updateOnSubtaskChange(task: Task) {
    task.completed = this.allComplete(task.subtasks);
  }
}

@Component({
  selector: 'md-checkbox-demo',
  template: require('./checkbox-demo.html'),
  styles: [require('./checkbox-demo.scss')],
  directives: [MdCheckbox, MdCheckboxDemoNestedChecklist]
})
export class CheckboxDemo {
  isIndeterminate: boolean = false;
  isChecked: boolean = false;
  isDisabled: boolean = false;
  alignment: string = 'start';

  printResult() {
    if (this.isIndeterminate) {
      return 'Maybe!';
    }
    return this.isChecked ? 'Yes!' : 'No!';
  }
}
