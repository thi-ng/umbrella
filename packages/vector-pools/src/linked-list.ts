import type { NumericArray } from "@thi.ng/api";
import type { StridedVec } from "@thi.ng/vectors";
import { AVecList } from "./alist.js";
import type { VecFactory } from "./api.js";

interface Cell<T extends StridedVec> {
    prev: CellVec<T> | null;
    next: CellVec<T> | null;
}

type CellVec<T extends StridedVec> = T & Cell<T>;

export class VecLinkedList<T extends StridedVec> extends AVecList<T> {
    head: CellVec<T> | null;
    tail: CellVec<T> | null;
    readonly closed: boolean;

    protected _length: number;

    /**
     *
     * @param closed -
     * @param buffer -
     * @param capacity -
     * @param size -
     * @param factory -
     * @param cstride -
     * @param estride -
     * @param start -
     */
    constructor(
        closed: boolean,
        buffer: NumericArray,
        capacity: number,
        size: number,
        start = 0,
        cstride = 1,
        estride = size,
        factory?: VecFactory
    ) {
        super(buffer, capacity, size, cstride, estride, start, factory);
        this.closed = closed;
        this.head = null;
        this.tail = null;
        this._length = 0;
    }

    *[Symbol.iterator]() {
        if (this._length) {
            let v = this.head;
            const first = v;
            do {
                yield v!;
                v = v!.next;
            } while (v && v !== first);
        }
    }

    get length() {
        return this._length;
    }

    add(): T {
        const v = <CellVec<T>>this.alloc();
        if (v) {
            if (this.tail) {
                v.prev = this.tail;
                this.tail.next = v;
                this.tail = v;
                if (this.closed) {
                    v.next = this.head;
                    this.head!.prev = v;
                }
                this._length++;
            } else {
                this.tail = this.head = v;
                v.next = v.prev = this.closed ? v : null;
                this._length++;
            }
        }
        return v;
    }

    insert(i: number): T | undefined {
        if (!this._length) {
            return i === 0 ? this.add() : undefined;
        }
        const q = <CellVec<T>>this.nth(i);
        if (!q) return;
        const v = <CellVec<T>>this.alloc();
        if (v) {
            if (this.head === q) {
                this.head = v;
            }
            v.next = q;
            v.prev = q.prev;
            if (q.prev) {
                q.prev.next = v;
            }
            q.prev = v;
            this._length++;
        }
        return v;
    }

    remove(vec: T): boolean {
        if (this.has(vec)) {
            this._length--;
            this.freeIDs.push(vec.offset);
            const v = <CellVec<T>>vec;
            if (v.prev) {
                v.prev.next = v.next;
            }
            if (this.head === v) {
                this.head = this._length ? v.next : null;
            }
            if (v.next) {
                v.next.prev = v.prev;
            }
            if (this.tail === v) {
                this.tail = this._length ? v.prev : null;
            }
            delete (<any>v).prev;
            delete (<any>v).next;
            return true;
        }
        return false;
    }

    has(value: T) {
        let v = this.head;
        const first = v;
        do {
            if (v === value) {
                return true;
            }
            v = v!.next;
        } while (v && v !== first);
        return false;
    }

    nth(n: number): T | undefined {
        if (n < 0) {
            n += this._length;
        }
        if (n < 0 || n >= this._length) {
            return;
        }
        let v;
        if (n <= this._length >> 1) {
            v = this.head;
            while (n-- > 0 && v) {
                v = v.next;
            }
        } else {
            v = this.tail;
            n = this._length - n - 1;
            while (n-- > 0 && v) {
                v = v.prev;
            }
        }
        return v!;
    }
}
