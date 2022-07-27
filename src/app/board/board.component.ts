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

  /**
   * Calls the loadTasks function from the task service in order to get the data from the local storage and then assigns this data to the
   * four local arrays (tasks, inProgress, testing, done). This way the 'board.component.html' file can display all the tasks created so
   * far and, if the function detects that there is no task stored in the local storage, it adds two sample tasks to the tasks array so 
   * that the user has a reference of what the tasks look like on the kanban board.
   */
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

  /**
   * 
   * @param event - This contains all the information of the element
   */
  drop(event: CdkDragDrop<Task[]>) {

    console.log(event);

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

  /**
   * Opens the 'DialogSeeTaskDetailsComponent' and gives it the data of the passed-in task so that the 
   * 'dialog-see-task-details.component.html' file can display its details.
   * @param task - This is the task whose data is passed to 'DialogSeeTaskDetailsComponent'.
   */
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

  /**
   * Opens the 'DialogEditTaskComponent' and gives it the data of the passed-in task so that 'dialog-edit-task.component.html' file can 
   * display its details. Until this point this function does the same as the showTaskDetails function but the difference is that, when 
   * the 'DialogEditTaskComponent' is closed, the function receives the NEW/EDITED task and pushes it into the same spot where the 
   * passed-in task was. To do that, the function deletes first the passed-in task (otherwise the new/edited task could never occupy
   * the exact same spot as the passed-in task).
   * @param task - This is the task whose data is passed to 'DialogEditTaskComponent'.
   * @param taskId 
   * @param arr 
   */
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

    dialogRef.afterClosed().subscribe((data?: Task) => {

      if (data) {

        this.deleteTask(taskId, arr);

        arr.splice(taskId, 0, data);
  
        //This step is not really necessary... could be removed in the future.
        this.taskService.tasks = this.tasks;
        this.taskService.inProgress = this.inProgress;
        this.taskService.testing = this.testing;
        this.taskService.done = this.done;
  
        this.taskService.saveTasks();

      }
     
    });

  }

  /**
   * Deletes the passed-in task from the passed-in array and calls the saveTasks function from the task service to save the changes made.
   * @param taskId - This is the id of the passed-in task.
   * @param arr - This is the passed-in arr.
   */
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
