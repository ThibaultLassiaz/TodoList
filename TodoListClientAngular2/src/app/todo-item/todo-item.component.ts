import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ListID, ItemJSON, TodoListService} from "../todo-list.service";
import {SubLisType} from "../../data/protocol";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input() item: ItemJSON;
  @Input() listId: ListID;
  @Input() clock: number;
  private editingLabel = false;

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
  }

  getTitle()
  {
    return this.item.checked ? "Restaurer cette tache" : "Archiver cette tâche";
  }

  getPicto() {
   return this.item.checked ? "clear" : "done";
  }


  setStyle() {
    let styles = {
      'width' : this.item.checked ? '69.5%' : '55.1%'
    }
    return styles;
  }


  setStyleDiv() {
    let styles = {
      'min-width' : this.item.checked ? '32%' : '45%'
    }
    return styles;
  }

  setStyleBtn() {
    let styles = {
  'width' : this.item.checked ? '50%' : '33%'
}
  return styles;
}

  togglePined() {
    this.item.data.pined = !this.item.data.pined;
   this.todoListService.SERVER_UPDATE_ITEM_DATA(this.listId, this.item.id, this.item.data);
  }

  textPined(){
    return this.item.data.pined ? "Désépingler" : "Epingler";
  }

  setLabel(label: string) {
    if (label === "") {
      this.delete();
    } else {
      this.todoListService.SERVER_UPDATE_ITEM_LABEL(this.listId, this.item.id, label);
    }
    this.editLabel(false);
  }

  isEditingLabel(): boolean {
    return this.editingLabel;
  }

  editLabel(edit: boolean) {
    this.editingLabel = edit;
  }

  check(checked: boolean) {
    this.todoListService.SERVER_UPDATE_ITEM_CHECK(this.listId, this.item.id, checked);
  }

  delete() {
    this.todoListService.SERVER_DELETE_ITEM(this.listId, this.item.id);
  }
}
