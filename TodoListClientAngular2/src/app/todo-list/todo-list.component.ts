import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";
import {ItemJSON, TypeSort, SubLisType} from "../../data/protocol";
import {MatSnackBar} from "@angular/material";

type functionSortItem = (item1: ItemJSON, item2: ItemJSON) => number;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Input() list: TodoListWithItems;
  @Input() clock: number;
  TypeSort: TypeSort;
  panelOpenState = false;

  functionSort: functionSortItem;

  subLists = [
    {type: SubLisType.ListPinned},
    {type: SubLisType.ListTodo},
    {type: SubLisType.ListDone},
]

  getPinnedItems() {
    return this.list.items.filter((item) => {
      return item.data.pined && !item.checked;
    });
  }

  getTodoItems(){
    return this.list.items.filter((item) => {
      return !item.checked && !item.data.pined;
    });
  }

  getDoneItems(){
    return this.list.items.filter((item) => {
      return item.checked;
    });
  }

  setSortLabel(): void {
    this.TypeSort = TypeSort.TriLabel;
    this.snackBar.open('Liste triée (A-Z)', 'Fermer', {
      duration: 2000,
    });
  }

  setSortDate(): void {
    this.TypeSort = TypeSort.TriDate;
    this.snackBar.open('Liste triée (date)', 'Fermer', {
      duration: 2000,
    });
  }


  functionSortAlphabetical: functionSortItem = (itemA: ItemJSON, itemB: ItemJSON) => {
    const resAscendant = itemA.label > itemB.label ? 1 : -1;
    return resAscendant;
  }


  functionSortDate: functionSortItem = (itemA: ItemJSON, itemB: ItemJSON) => {
    const resAscendant = new Date(itemA.data.date).getTime() - new Date(itemB.data.date).getTime();
    return resAscendant;
  }


  getSortedItemsTyped(type: SubLisType) : ItemJSON[] {
    let itemsFiltered: ItemJSON[];
    switch(type) {
      case SubLisType.ListPinned :
        itemsFiltered = this.getPinnedItems();
        break;
      case SubLisType.ListTodo :
        itemsFiltered = this.getTodoItems();
        break;
      case SubLisType.ListDone :
        itemsFiltered = this.getDoneItems();
        break;
    }
    return this.getItemsSort(itemsFiltered); // Renvoi ces item triés
  }

  getItemsSort(items:ItemJSON[] ): ItemJSON[] {
    let functionSort: functionSortItem;
    switch (this.TypeSort) {
      case TypeSort.TriLabel :
        functionSort = this.functionSortAlphabetical;
        break;
      case TypeSort.TriDate :
        functionSort = this.functionSortDate;
        break;
    }
    return items.sort(functionSort);

  }

  constructor(private todoListService: TodoListService, private snackBar: MatSnackBar) {
    this.functionSort = this.functionSortAlphabetical;
  }

  ngOnInit() {
  }

  delete() {
    this.todoListService.SERVER_DELETE_LIST(this.list.id);
    this.snackBar.open('Liste supprimée', 'Fermer', {
      duration: 2000,
    });
  }

  getColor(): string {
    return this.list.data["color"] ? this.list.data["color"] : "#FFFFFF";
  }

  setColor(color: string) {
    console.log("setColor", color);
    this.todoListService.SERVER_UPDATE_LIST_DATA(
      this.list.id,
      Object.assign({}, this.list.data, {color})
    );
  }
}
