import { Injectable } from '@angular/core';
import { Task } from 'src/models/task.class';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];
  inProgress: Task[] = [];
  testing: Task[] = [];
  done: Task[] = [];

  constructor() { }

  saveTasks() {

    let toDosAsText = JSON.stringify(this.tasks);
    localStorage.setItem('toDosAsText', toDosAsText);

    let inProgressAsText = JSON.stringify(this.inProgress);
    localStorage.setItem('inProgressAsText', inProgressAsText);

    let testingAsText = JSON.stringify(this.testing);
    localStorage.setItem('testingAsText', testingAsText);

    let doneAsText = JSON.stringify(this.done);
    localStorage.setItem('doneAsText', doneAsText);

  }

  loadTasks() {

    let toDosAsText = localStorage.getItem('toDosAsText');

    if (toDosAsText) {

      this.tasks = JSON.parse(toDosAsText);
        
    }

    let inProgressAsText = localStorage.getItem('inProgressAsText');

    if (inProgressAsText) {

      this.inProgress = JSON.parse(inProgressAsText);
        
    }

    let testingAsText = localStorage.getItem('testingAsText');

    if (testingAsText) {

      this.testing = JSON.parse(testingAsText);
        
    }

    let doneAsText = localStorage.getItem('doneAsText');

    if (doneAsText) {

      this.done = JSON.parse(doneAsText);
        
    }

  }

}
