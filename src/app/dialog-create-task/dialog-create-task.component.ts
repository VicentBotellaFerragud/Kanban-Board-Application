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

  firstFormGroup = this._formBuilder.group({
    taskTitle: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    taskDescription: ['', Validators.required], 
  });

  thirdFormGroup = this._formBuilder.group({
    taskPriority: ['', Validators.required],
  });

  fourthFormGroup = this._formBuilder.group({
    taskDueDate: ['', Validators.required],
  });

  fifthFormGroup = this._formBuilder.group({
    taskManager: ['', Validators.required],
  });

  isLinear = false;

  priorityList: any[] = [
    {value: 'highest', viewValue: 'Highest'},
    {value: 'high', viewValue: 'High'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'low', viewValue: 'Low'}
  ];

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
    this.newTask.priority = this.thirdFormGroup.get('taskPriority')?.value;
    this.newTask.dueTo = this.fourthFormGroup.get('taskDueDate')?.value;
    this.newTask.assignedTo = this.fifthFormGroup.get('taskManager')?.value;
  }

}
