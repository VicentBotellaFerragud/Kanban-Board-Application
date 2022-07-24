import { Component, OnInit } from '@angular/core';
import { Task } from 'src/models/task.class';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogSeeTaskDetailsComponent } from '../dialog-see-task-details/dialog-see-task-details.component';
import { TaskService } from 'src/services/task.service';
import { DialogEditTaskComponent } from '../dialog-edit-task/dialog-edit-task.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

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
    createdAt: '07/05/2022',
    dueTo: '31/05/2022',
    assignedTo: 'Tom'
  }

  constructor(public dialog: MatDialog, private taskService: TaskService) { }

  ngOnInit(): void {

    this.taskService.loadTasks();

    this.tasks = this.taskService.tasks;
    this.inProgress = this.taskService.inProgress;
    this.testing = this.taskService.testing;
    this.done = this.taskService.done;

    if (this.tasks.length === 0 && this.inProgress.length === 0 && this.testing.length === 0 && this.done.length === 0) {
      this.tasks.push(this.firstSampleTask);
      this.tasks.push(this.secondSampleTask);
    }

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

    //This step is not really necessary... could be removed in the future.
    this.taskService.tasks = this.tasks;
    this.taskService.inProgress = this.inProgress;
    this.taskService.testing = this.testing;
    this.taskService.done = this.done;

    this.taskService.saveTasks();

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

  editTask(task: Task, taskId: number, arr: Task[]) {

    let dialogRef = this.dialog.open(DialogEditTaskComponent, {
      data: {
        title: task.title,
        description: task.description,
        priority: task.priority,
        createdAt: task.createdAt,
        dueTo: task.dueTo,
        assignedTo: task.assignedTo
      }
    });

    dialogRef.afterClosed().subscribe((data: Task) => {
      console.log(data);

      this.deleteTask(taskId, arr);

      arr.splice(taskId, 0, data);

      //This step is not really necessary... could be removed in the future.
      this.taskService.tasks = this.tasks;
      this.taskService.inProgress = this.inProgress;
      this.taskService.testing = this.testing;
      this.taskService.done = this.done;

      this.taskService.saveTasks();

    });

  }

  deleteTask(taskId: number, arr: Task[]) {

    arr.splice(taskId, 1);

    //This step is not really necessary... could be removed in the future.
    this.taskService.tasks = this.tasks;
    this.taskService.inProgress = this.inProgress;
    this.taskService.testing = this.testing;
    this.taskService.done = this.done;

    this.taskService.saveTasks();

  }

}
