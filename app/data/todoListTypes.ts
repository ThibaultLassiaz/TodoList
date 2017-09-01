import {List} from "immutable";
import {ListID, ItemID, ItemJSON, TodoListJSON} from "./protocol";

export class Item {
    private lastJSON: ItemJSON;
    constructor(private label: string, private checked: boolean, private date: number, private id: ItemID, private clock: number) {
        this.date = this.date || Date.now();
    }

    hasId(id: ItemID): boolean {
        return this.id === id;
    }

    getId(): ItemID {
        return this.id;
    }

    getLabel(): string {
        return this.label;
    }

    getChecked(): boolean {
        return this.checked;
    }

    getDate(): number {
        return this.date;
    }

    setLabel(str: string): Item {
        return new Item(str, this.getChecked(), this.getDate(), this.id, ++this.clock);
    }

    setChecked(checked: boolean): Item {
        return new Item(this.getLabel(), checked, this.getDate(), this.id, ++this.clock);
    }

    setStateFromJSON(json: ItemJSON): Item {
        return new Item(json.label, json.checked, json.date, json.id, ++this.clock);
    }

    toJSON(): ItemJSON {
        this.lastJSON = this.lastJSON || {
            label: this.label,
            checked: this.checked,
            date: this.date,
            id: this.id,
            clock: this.clock
        };
        return this.lastJSON;
    }
}

export class TodoList {
    private lastJSON: TodoListJSON;

    constructor(private name: string, private items: List<Item>, private id: ListID, private clock: number) {
        items = items || List<Item>();
    }

    hasId(id: ItemID): boolean {
        return this.id === id;
    }

    getId(): ItemID {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): TodoList {
        return new TodoList(name, this.getItems(), this.id, ++this.clock);
    }

    contains(item: Item): boolean {
        return this.items.contains( item );
    }

    getItems(): List<Item> {
        return this.items;
    }

    push(item: Item): TodoList {
        return new TodoList(this.getName(), this.getItems().push((item)), this.id, ++this.clock);
    }

    delete(ItemID: ItemID): TodoList {
        const items = this.getItems().filterNot(item => item.hasId(ItemID));
        return new TodoList(this.getName(), List<Item>(items), this.id, ++this.clock);
    }

    findItem(fct: (item: Item) => boolean): Item {
        return this.items.find( fct );
    }

    getItemLabel(idItem: ItemID): string {
        const item = this.items.find(item => item.hasId(idItem));
        if (item) {
            return item.getLabel();
        } else {
            throw "NO ITEM IDENTIFIED BY THIS ID IN THIS LIST";
        }
    }

    getItemCheck(idItem: ItemID): boolean {
        const item = this.items.find(item => item.hasId(idItem));
        if (item) {
            return item.getChecked();
        } else {
            throw "NO ITEM IDENTIFIED BY THIS ID IN THIS LIST";
        }
    }

    setItemLabel(idItem: ItemID, label: string): TodoList {
        const item = this.items.find(item => item.hasId(idItem));
        if (item) {
            const newItem = item.setLabel(label);
            return new TodoList(
                this.getName(),
                List<Item>(this.items.map(item => item.hasId(idItem) ? newItem : item)),
                this.id,
                ++this.clock
            );
        } else {
            return this;
        }
    }

    setItemChecked(idItem: ItemID, checked: boolean): TodoList {
        const item = this.items.find(item => item.hasId(idItem));
        if (item) {
            const newItem = item.setChecked(checked);
            return new TodoList(
                this.getName(),
                List<Item>(this.items.map(item => item.hasId(idItem) ? newItem : item)),
                this.id,
                ++this.clock
            );
        } else {
            return this;
        }
    }

    update(name: string, items: Item[]): TodoList {
        return new TodoList(name, List(items), this.id, ++this.clock);
    }

    toJSON(): TodoListJSON {
        this.lastJSON = this.lastJSON || {
            name: this.name,
            items: this.items.map(item => item.getId() ).toArray(),
            id: this.id,
            clock: this.clock
        };
        return this.lastJSON;
    }
}
