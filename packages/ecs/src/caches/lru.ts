import type { Fn0 } from "@thi.ng/api";
import type { ConsCell } from "@thi.ng/dcons";
import { DCons } from "@thi.ng/dcons/dcons";
import type { ICache } from "../api.js";

type LRUEntry<T> = { k: number; v: T };

export class LRU<T> implements ICache<T> {
    items: DCons<LRUEntry<T>>;
    index: Map<number, ConsCell<LRUEntry<T>>>;
    capacity: number;

    constructor(cap: number) {
        this.items = new DCons();
        this.index = new Map();
        this.capacity = cap;
    }

    keys() {
        return this.index.keys();
    }

    clear() {
        this.items.release();
        this.index.clear();
    }

    release() {
        this.clear();
        return true;
    }

    set(key: number, val: T) {
        const { items, index } = this;
        let node = index.get(key);
        if (node) {
            node.value.v = val;
            items.asHead(node);
        } else {
            items.prepend({ k: key, v: val });
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
        let val = this.get(key);
        return val !== undefined ? val : this.set(key, notFound());
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
