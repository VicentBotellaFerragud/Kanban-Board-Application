import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Task } from 'src/models/task.class';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input()
  tasks: Task[] = [];

  inProgress: Task[] = [];
  testing: Task[] = [];
  done: Task[] = [];

  exampleTask: Task = {
    title: "example", description: "example",
    urgency: '',
    createdAt: '',
    dueTo: '',
    assignedTo: ''
  }

  constructor() { }

  ngOnInit(): void {
    this.tasks.push(this.exampleTask);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  //I need to add an event emitter or something in order to push the newTask into the tasks array.
  //I could use ngOnChanges to detect the change of the input value and every time it changes I would push the newTask into the tasks array, 
  //but that's not recommended. FUrthermore ngOnChanges is called not just when the input value changes. THAT MEANS THE SAME TASK WOULD
  //BE ADDED SEVERAL TIMES.

}
