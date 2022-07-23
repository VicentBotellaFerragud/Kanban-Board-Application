import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';
import { TaskService } from 'src/services/task.service';

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

  isLinear: boolean = false;

  priorityList: any[] = [
    { value: 'highest', viewValue: 'Highest' },
    { value: 'high', viewValue: 'High' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'low', viewValue: 'Low' }
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogCreateTaskComponent>, 
    private _formBuilder: FormBuilder, 
    private taskService: TaskService
    ) { }

  ngOnInit(): void { }

  
  closeMatDialog() {

    this.dialogRef.close();

  }

  createTask() {

    let createdAt = this.getCurrentDate();

    let dueDate = this.convertDueDate(this.fourthFormGroup.get('taskDueDate')?.value);

    this.newTask.title = this.firstFormGroup.get('taskTitle')?.value;
    this.newTask.description = this.secondFormGroup.get('taskDescription')?.value;
    this.newTask.priority = this.thirdFormGroup.get('taskPriority')?.value;
    this.newTask.createdAt = createdAt;
    this.newTask.dueTo = dueDate;
    this.newTask.assignedTo = this.fifthFormGroup.get('taskManager')?.value;

    this.taskService.tasks.push(this.newTask);
    this.taskService.saveTasks();

  }

  getCurrentDate() {

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;

  }

  convertDueDate(date: string) {

    let dateWithoutSpaces = (date.toString()).replace(/ /g,'');

    let dateWithoutExtraInfo = dateWithoutSpaces.slice(3, 12);

    let day = dateWithoutExtraInfo.slice(3, 5);
    let month = dateWithoutExtraInfo.slice(0, 3);
    let year = dateWithoutExtraInfo.slice(5, 10);

    let monthsValues = [
      ['Jan','01'], ['Feb', '02'], ['Mar', '03'], ['Apr', '04'], 
      ['May', '05'], ['Jun', '06'], ['Jul', '07'], ['Aug', '08'],
      ['Sep','09'], ['Oct', '10'], ['Nov', '11'], ['Dec', '12']
    ];

    for (let i = 0; i < monthsValues.length; i++) {

      const element = monthsValues[i];
      const monthAsString = element[0];
      const monthAsNumber = element[1];
      
      if (monthAsString === month) {
        month = monthAsNumber;
      }

    }

    return day + '/' + month + '/' + year;

  }

}
