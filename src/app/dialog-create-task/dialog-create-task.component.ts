import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';

@Component({
  selector: 'app-dialog-create-task',
  templateUrl: './dialog-create-task.component.html',
  styleUrls: ['./dialog-create-task.component.scss']
})
export class DialogCreateTaskComponent implements OnInit {

  newTask: Task = new Task();

  /*
  taskForm = new FormGroup({
    title: new FormControl('hehe'),
    description: new FormControl('hihi'),
  });
  */

  firstFormGroup = this._formBuilder.group({
    taskTitle: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    taskDescription: ['', Validators.required],
  });

  isLinear = false;

  constructor(public dialogRef: MatDialogRef<DialogCreateTaskComponent>, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    /*
    this.taskForm.valueChanges.subscribe(value => {
      console.log(value);
   });
   */
  }

  onNoClick() {
    this.dialogRef.close();
  }

  createTask() {
    this.newTask.title = this.firstFormGroup.get('taskTitle')?.value;
    this.newTask.description = this.secondFormGroup.get('taskDescription')?.value;
  }

}
