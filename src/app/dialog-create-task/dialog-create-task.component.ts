import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Task } from 'src/models/task.class';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-dialog-create-task',
  templateUrl: './dialog-create-task.component.html',
  styleUrls: ['./dialog-create-task.component.scss']
})
export class DialogCreateTaskComponent implements OnInit {

  newTask: Task = new Task();

  isLinear: boolean = false;

  firstFormGroup = this._formBuilder.group({
    taskTitle: ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
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
    taskAssignee: ['', Validators.required],
  });

  priorityList: any[] = [
    { value: 'highest', viewValue: 'Highest' },
    { value: 'high', viewValue: 'High' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'low', viewValue: 'Low' }
  ];

  minDate = moment(new Date()).format('YYYY-MM-DD');

  constructor(
    public dialogRef: MatDialogRef<DialogCreateTaskComponent>, 
    private _formBuilder: FormBuilder, 
    private taskService: TaskService
    ) { }

  ngOnInit(): void { }

  /**
   * Closes the dialog.
   */
  closeMatDialog() {

    this.dialogRef.close();

  }

  /**
   * Creates a new task by taking the values of the form groups and assigning them to each of the properties of the newTask (of type 
   * 'Task') variable (for one specific property of the task the function makes use of another function instead of a form group value). 
   * The function then calls the task service to save the newly created task in one of its properties (tasks) and finally calls one of its 
   * methods (saveTasks) to store it in the local storage as well. Saving the new created task in the service is very important because 
   * this way other components can make use of it very easily.
   */
  createTask() {

    let createdAt = this.getCurrentDate();

    let dueDate = this.convertDueDate(this.fourthFormGroup.get('taskDueDate')?.value);

    this.newTask.title = this.firstFormGroup.get('taskTitle')?.value;
    this.newTask.description = this.secondFormGroup.get('taskDescription')?.value;
    this.newTask.priority = this.thirdFormGroup.get('taskPriority')?.value;
    this.newTask.createdAt = createdAt;
    this.newTask.dueTo = dueDate;
    this.newTask.assignedTo = this.fifthFormGroup.get('taskAssignee')?.value;

    this.taskService.tasks.push(this.newTask);
    this.taskService.saveTasks();

  }

  /**
   * Gets the current date in 'mm/dd/yyyy' format.
   * @returns - the current date in 'mm/dd/yyyy' format.
   */
  getCurrentDate() {

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;

  }

  /**
   * Converts the date entered by the user into 'mm/dd/yyyy' format.
   * @param date - This is the date to convert (it comes from the 'taskDueDate' form control name value).
   * @returns - the date entered by the user in 'mm/dd/yyyy' format.
   */
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

    return month + '/' + day + '/' + year;

  }

}
