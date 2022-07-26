import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Task } from 'src/models/task.class';

@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.scss']
})
export class DialogEditTaskComponent implements OnInit {

  editedTask: Task = new Task();

  isLinear: boolean = false;

  firstFormGroup = this._formBuilder.group({
    taskTitle: [this.data.title, Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    taskDescription: [this.data.description, Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    taskPriority: [this.data.priority, Validators.required],
  });

  fourthFormGroup = this._formBuilder.group({
    taskDueDate: [this.data.dueTo, Validators.required],
  });

  fifthFormGroup = this._formBuilder.group({
    taskAssignee: [this.data.assignedTo, Validators.required],
  });

  priorityList: any[] = [
    { value: 'highest', viewValue: 'Highest' },
    { value: 'high', viewValue: 'High' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'low', viewValue: 'Low' }
  ];

  minDate = moment(new Date()).format('YYYY-MM-DD');

  constructor(
    private _formBuilder: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<DialogEditTaskComponent>
    ) { }

  ngOnInit(): void { }

  /**
   * Closes the dialog.
   */
  closeMatDialog() {

    this.dialogRef.close();

  }

  /**
   * Assigns the values of the form groups to each of the properties of the editedTask (of type 'Task') variable. For one specific 
   * property of the task the function makes use of the 'data' variable (declared in the constructor), which comes from the file 
   * 'board.component.ts' and allows the app to get the current information of the task being edited (the information of the task 
   * BEFORE the user edits it). It is important to note that, unlike in the 'dialog-create-task.component.ts' file, here the task 
   * service is not called to save the changes. This is because this functionality is performed in this case in the 'board.component.ts' 
   * file, which, once the dialog-edit-task component is closed, receives from this function the necessary information to create a 
   * new task that will replace the old one (the current task BEFORE the user modifies it).
   */
  save() {

    let dueDate = this.convertDueDate(this.fourthFormGroup.get('taskDueDate')?.value);

    this.editedTask.title = this.firstFormGroup.get('taskTitle')?.value;
    this.editedTask.description = this.secondFormGroup.get('taskDescription')?.value;
    this.editedTask.priority = this.thirdFormGroup.get('taskPriority')?.value;
    this.editedTask.createdAt = this.data.createdAt;
    this.editedTask.dueTo = dueDate;
    this.editedTask.assignedTo = this.fifthFormGroup.get('taskAssignee')?.value;

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
