import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/models/task.class';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogSeeTaskDetailsComponent } from '../dialog-see-task-details/dialog-see-task-details.component';

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

  firstSampleTask: Task = {
    title: "Software tests",
    description: "Software tests needs to be run",
    priority: 'high',
    createdAt: '05-05-2022',
    dueTo: '30-05-2022',
    assignedTo: 'Mark'
  }

  secondSampleTask: Task = {
    title: "App video",
    description: "Video explaining the app needs to be made",
    priority: 'medium',
    createdAt: '07-05-2022',
    dueTo: '31-05-2022',
    assignedTo: 'Tom'
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

    this.tasks.push(this.firstSampleTask);
    this.tasks.push(this.secondSampleTask);

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

  showTaskDetails(task: Task) {

    this.dialog.open(DialogSeeTaskDetailsComponent, {
      data: {
        title: task.title,
        description: task.description,
        priority: task.priority,
        createdAt: task.createdAt,
        dueTo: task.dueTo,
        assignedTo: task.assignedTo
      }
    });

  }

}
