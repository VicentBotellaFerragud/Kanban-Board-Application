import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateTaskComponent } from './dialog-create-task/dialog-create-task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Kanban-Board-Application';

  constructor(public dialog: MatDialog) { }

  openDialog() {
    
    this.dialog.open(DialogCreateTaskComponent);

  }

}
