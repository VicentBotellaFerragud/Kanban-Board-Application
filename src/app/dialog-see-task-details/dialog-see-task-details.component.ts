import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-see-task-details',
  templateUrl: './dialog-see-task-details.component.html',
  styleUrls: ['./dialog-see-task-details.component.scss']
})
export class DialogSeeTaskDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogSeeTaskDetailsComponent>) { }

  ngOnInit(): void {

    console.log(this.data);

  }

  closeMatDialog() {

    this.dialogRef.close();
    
  }

}
