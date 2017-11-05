import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ListID, ItemJSON, TodoListService} from "../todo-list.service";
import {dataForItem} from "../../data/protocol";


@Component({
  selector: 'app-task-modal-modification',
  templateUrl: './task-modal-modification.component.html',
  styleUrls: ['./task-modal-modification.component.css']
})
export class TaskModalModificationComponent implements OnInit {

  @Input() listId: ListID;
  @Input() itemId: ItemJSON;

  constructor(public dialog: MatDialog) {}

  // To open the modal window
  openDialog(): void {
    let dialogRef = this.dialog.open(TaskModalModificationComponentForm, {
      width: '450px', data: {
        id : this.listId,
        itemId : this.itemId
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
  selector: 'app-task-modal-modification-form',
  templateUrl: './task-modal-modification-form.component.html',
  styleUrls: ['./task-modal-modification.component.css']
})
export class TaskModalModificationComponentForm {

  @Input() date: Date;
  public pined:boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TaskModalModificationComponentForm>,
    @Inject(MAT_DIALOG_DATA) public data: any, private todoListService: TodoListService) { }



  onNoClick(): void {
    this.dialogRef.close();
  }

  public onPinedCbChanged(value:boolean){
    this.pined = value;
  }

  updateItem(ListId : ListID, ItemId : string, label: string, description : string, date : string, checkbox : boolean) {
    console.log(checkbox);
    const itemEdit: dataForItem = {
      description : description,
      date : date,
      pined : checkbox,
    };
    const id = this.todoListService.SERVER_UPDATE_ITEM_LABEL(ListId, ItemId, label);
    const idbis = this.todoListService.SERVER_UPDATE_ITEM_DATA(ListId, ItemId, itemEdit);
  }
}
