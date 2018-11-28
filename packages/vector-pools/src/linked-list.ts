import { IVector, Vec } from "@thi.ng/vectors3/api";
import { AVecList } from "./alist";
import { VecFactory } from "./api";

export class VecLinkedList<T extends IVector<any>> extends AVecList<T> {

    head: T;
    tail: T;
    readonly closed: boolean;

    protected _length: number;

    /**
     *
     * @param closed
     * @param buffer
     * @param capacity
     * @param size
     * @param factory
     * @param cstride
     * @param estride
     * @param start
     */
    constructor(
        closed: boolean,
        buffer: Vec,
        capacity: number,
        size: number,
        factory?: VecFactory,
        cstride = 1,
        estride = size,
        start = 0) {

        super(buffer, capacity, size, factory, cstride, estride, start);
        this.closed = closed;
        this.head = null;
        this.tail = null;
        this._length = 0;
    }

    *[Symbol.iterator]() {
        if (this._length) {
            let v: any = this.head;
            const first = v;
            do {
                yield v;
                v = v.next;
            } while (v && v !== first);
        }
    }

    get length() {
        return this._length;
    }

    add(): T {
        const v: any = this.alloc();
        if (v) {
            if (this.tail) {
                v.prev = this.tail;
                (<any>this.tail).next = v;
                this.tail = v;
                if (this.closed) {
                    v.next = this.head;
                    (<any>this.head).prev = v;
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

    insert(i: number): T {
        if (!this._length) {
            return i === 0 ? this.add() : undefined;
        }
        const q: any = this.nth(i);
        if (!q) return;
        const v: any = this.alloc();
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
            this._free.push(vec);
            const v: any = vec;
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
            delete v.prev;
            delete v.next;
            return true;
        }
    }

    has(value: T) {
        let v: any = this.head;
        const first = v;
        do {
            if (v === value) {
                return true;
            }
            v = v.next;
        } while (v && v !== first);
        return false;
    }

    nth(n: number): T {
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
        return v;
    }
}
