import {Component, OnInit, Input} from '@angular/core';
import {ItemJSON} from "../../data/protocol";

@Component({
  selector: 'app-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.css']
})
export class SubListComponent implements OnInit {

  @Input() items: ItemJSON[];
  @Input() listId: number;

  constructor() { }

  getItems() {
    return this.items;
  }

  ngOnInit() {
  }
}
