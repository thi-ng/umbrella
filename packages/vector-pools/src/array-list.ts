import { IVector, Vec } from "@thi.ng/vectors3/api";
import { AVecList } from "./alist";
import { VecFactory } from "./api";

export class VecArrayList<T extends IVector<any>> extends AVecList<T> {

    items: T[];

    /**
     *
     * @param buffer
     * @param capacity
     * @param size
     * @param cstride
     * @param estride
     * @param start
     */
    constructor(
        buffer: Vec,
        capacity: number,
        size: number,
        factory?: VecFactory,
        cstride = 1,
        estride = size,
        start = 0) {

        super(buffer, capacity, size, factory, cstride, estride, start);
        this.items = [];
    }

    *[Symbol.iterator]() {
        yield* this.items;
    }

    get length() {
        return this.items.length;
    }

    add() {
        const v: T = this.alloc();
        if (v) {
            this.items.push(v);
        }
        return v;
    }

    insert(i: number) {
        if (!this.length && i !== 0) return;
        const v: T = this.alloc();
        if (v) {
            this.items.splice(i, 0, v);
        }
        return v;
    }

    remove(v: T) {
        const idx = this.items.indexOf(v);
        if (idx >= 0) {
            this._free.push(v);
            this.items.splice(idx, 1);
            return true;
        }
    }
}
