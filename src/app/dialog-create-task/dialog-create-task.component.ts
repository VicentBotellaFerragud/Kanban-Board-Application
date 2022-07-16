import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';

@Component({
  selector: 'app-dialog-create-task',
  templateUrl: './dialog-create-task.component.html',
  styleUrls: ['./dialog-create-task.component.scss']
})
export class DialogCreateTaskComponent implements OnInit {

  newTask: Task = new Task();

  taskForm = new FormGroup({
    title: new FormControl('hehe'),
    description: new FormControl('hihi'),
  });

  constructor(public dialogRef: MatDialogRef<DialogCreateTaskComponent>) { }

  ngOnInit(): void {
    this.taskForm.valueChanges.subscribe(value => {
      console.log(value);
   });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  createTask() {
    this.newTask.title = this.taskForm.get('title')?.value;
    this.newTask.description = this.taskForm.get('description')?.value;
  }

}
