import { Fn0 } from "@thi.ng/api";
import { ConsCell, DCons } from "@thi.ng/dcons";
import { ICache, LRUEntry } from "./api";

export class LRU<T> implements ICache<T> {
    items: DCons<LRUEntry<T>>;
    index: Map<number, ConsCell<LRUEntry<T>>>;
    capacity: number;

    constructor(cap = 16) {
        this.items = new DCons();
        this.index = new Map();
        this.capacity = cap;
    }

    add(key: number, val: T) {
        const { items, index } = this;
        let node = index.get(key);
        if (node) {
            node.value.v = val;
            items.asHead(node);
        } else {
            items.cons({ k: key, v: val });
            index.set(key, items.head!);
            while (items.length > this.capacity) {
                this.index.delete(this.items.pop()!.k);
            }
        }
        return val;
    }

    get(key: number) {
        const node = this.index.get(key);
        if (node) {
            this.items.asHead(node);
            return node.value.v;
        }
    }

    getSet(key: number, notFound: Fn0<T>) {
        return this.get(key) || this.add(key, notFound());
    }

    delete(key: number) {
        const node = this.index.get(key);
        if (node) {
            this.index.delete(key);
            this.items.remove(node);
            return true;
        }
        return false;
    }
}
