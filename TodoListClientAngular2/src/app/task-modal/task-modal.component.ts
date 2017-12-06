import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ListID, ItemJSON,  TodoListService} from "../todo-list.service";
import {dataForItem} from "../../data/protocol";
import {isUndefined} from "util";

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

  @Input() date: Date = new Date();
  public pined:boolean = false;
  public errorMessage = "";

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponentForm>,
    @Inject(MAT_DIALOG_DATA) public data: any, private todoListService: TodoListService) { }




  onNoClick(): void {
    this.dialogRef.close();
  }

  public getErrorMessage() : string{
    return this.errorMessage;
  }

  public onPinedCbChanged(value:boolean){
    this.pined = value;
  }



  createItem(ListId : ListID, label: string, description : string, date : string, checkbox : boolean) {
    console.log(label);
    if(label === ""){
      this.errorMessage = "le nom d'une tâche est obligatoire";
    }
    else {
      console.log(label);
      const itemEdit: dataForItem = {
        description: description,
        date: date,
        pined: checkbox,
      };

      const id = this.todoListService.SERVER_CREATE_ITEM(ListId, label, false, itemEdit);
      this.dialogRef.close();

    }


  }


}


