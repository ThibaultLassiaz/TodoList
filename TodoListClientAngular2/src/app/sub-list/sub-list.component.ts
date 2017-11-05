import {Component, OnInit, Input} from '@angular/core';
import {ItemJSON, SubLisType} from "../../data/protocol";

@Component({
  selector: 'app-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.css']
})
export class SubListComponent implements OnInit {

  @Input() items: ItemJSON[];
  @Input() listId: number;
  @Input() typeList : SubLisType;

  getTitle() {
  switch (this.typeList) {
    case SubLisType.ListDone :
      return "Done";
    case SubLisType.ListTodo :
      return "Todo";
    case SubLisType.ListPinned :
      return "Pined";
  }
}

  constructor() { }

  getItems() {
    return this.items;
  }

  ngOnInit() {
  }
}
