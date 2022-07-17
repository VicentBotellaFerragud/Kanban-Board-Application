import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateTaskComponent } from './dialog-create-task/dialog-create-task.component';
import { Task } from 'src/models/task.class';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Kanban-Board-Application';

  tasks: Task[] = [];

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateTaskComponent);
    dialogRef.afterClosed().subscribe(res => {

      if (res.title === '') {
        console.log(res);
        return;
      } else {
        this.tasks.push(res);
        console.log(res);
      }
      
    })
  }

}
