import { Component, OnInit } from '@angular/core';
import {TodoListWithItems, TodoListJSON, TodoListService, ItemJSON} from "../todo-list.service";
import {List} from "immutable";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  // lists = List<TodoListJSON>();
  currentList: TodoListWithItems;

  constructor(private todoListService: TodoListService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  getLists(): TodoListWithItems[] {
    return this.todoListService.getLists();
  }

  createList(name: string) {
    const localListID = this.todoListService.SERVER_CREATE_NEW_LIST(name, {
      color: "#FFFFFF",
      someOtherAttribute: "pourquoi pas un texte ?"
      // Add other data here...
    });
    this.snackBar.open('Liste créée', 'Fermer', {
      duration: 2000,
    });
  }

  updateList(listToShow: TodoListWithItems) {
    this.currentList = listToShow;
    console.log(this.currentList);
  }

  getCurrentList(): TodoListWithItems {
    const currentList = this.getLists().find( L => L === this.currentList );
    return currentList;
  }
}
