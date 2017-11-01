import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ListID, ItemJSON, TodoListService} from "../todo-list.service";


@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {

  @Input() listId: ListID;
  constructor(public dialog: MatDialog) {}

  // To open the modal window
  openDialog(): void {
    let dialogRef = this.dialog.open(TaskModalComponentForm, {
      width: '450px', data: {
        id : this.listId
      }
    });

    console.log(this.listId);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-task-modal-form',
  templateUrl: './task-modal-form.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponentForm {

  @Input() date: Date;
  public pined:boolean;

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponentForm>,
    @Inject(MAT_DIALOG_DATA) public data: any, private todoListService: TodoListService) { }



  onNoClick(): void {
    this.dialogRef.close();
  }

  public onPinedCbChanged(value:boolean){
    this.pined = value;
  }

  createItem(ListId : ListID, label: string, description : string, date : Date, checkbox : boolean) {
    console.log(checkbox);
    const id = this.todoListService.SERVER_CREATE_ITEM(ListId, label, false, {
      someData: "someValue",
      someNumber: 42,
      someArray: ["riri", "fifi", "loulou"],
      itemColor: "#FFFFFF",
      description : description,
      date : date,
      pined : checkbox,
      // Add other data here...
    });
  }


}


