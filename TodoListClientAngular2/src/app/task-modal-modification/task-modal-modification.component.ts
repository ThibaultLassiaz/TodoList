import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
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
  @Input() item : ItemJSON;

  constructor(public dialog: MatDialog) {}

  // To open the modal window
  openDialog(): void {
    let dialogRef = this.dialog.open(TaskModalModificationComponentForm, {
      width: '450px', data: {
        id : this.listId,
        itemId : this.itemId,
        item : this.item
      }
    });

    console.log(this.listId);
    console.log(this.item.label);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  setStyleBtn() {
    let styles = {
      'width' : this.item.checked ? '48%' : '33%'
    }
    return styles;
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

  @Input() date: Date = new Date();
  public pined:boolean = false;
  public errorMessage = "";

  constructor(
    public dialogRef: MatDialogRef<TaskModalModificationComponentForm>, private snackBar: MatSnackBar,
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

  updateItem(ListId : ListID, ItemId : string, label: string, description : string, date : string, checkbox : boolean) {

    if(label === ""){
      this.errorMessage = "le nom d'une tâche est obligatoire";
    }
    else{
      console.log(checkbox);
      const itemEdit: dataForItem = {
        description : description,
        date : date,
        pined : checkbox,
      };
      const id = this.todoListService.SERVER_UPDATE_ITEM_LABEL(ListId, ItemId, label);
      const idbis = this.todoListService.SERVER_UPDATE_ITEM_DATA(ListId, ItemId, itemEdit);

      this.dialogRef.close();
      this.snackBar.open('Tâche modifiée', 'Fermer', {
        duration: 2000,
      });
    }

  }
}
