import type {
    Comparator,
    Fn,
    IClear,
    ICompare,
    ICopy,
    IEmpty,
    IEquiv,
    ILength,
    IRelease,
    ISeq,
    ISeqable,
    IStack,
    Predicate
} from "@thi.ng/api";
import { isArrayLike } from "@thi.ng/checks";
import { compare } from "@thi.ng/compare";
import { equiv } from "@thi.ng/equiv";
import { ensureIndex, illegalArgs } from "@thi.ng/errors";
import { IRandom, SYSTEM } from "@thi.ng/random";
import { IReducible, isReduced, ReductionFn } from "@thi.ng/transducers";

export interface ConsCell<T> {
    value: T;
    next: ConsCell<T> | undefined;
    prev: ConsCell<T> | undefined;
}

export class DCons<T>
    implements
        IClear,
        ICompare<DCons<T>>,
        ICopy<DCons<T>>,
        IEmpty<DCons<T>>,
        IEquiv,
        ILength,
        IReducible<any, T>,
        IRelease,
        ISeqable<T>,
        IStack<T, T, DCons<T>> {
    head: ConsCell<T> | undefined;
    tail: ConsCell<T> | undefined;
    protected _length: number = 0;

    constructor(src?: Iterable<T>) {
        if (src) {
            this.into(src);
        }
    }

    get length() {
        return this._length;
    }

    copy() {
        return new DCons<T>(this);
    }

    empty() {
        return new DCons<T>();
    }

    clear() {
        this.release();
    }

    release() {
        let cell = this.head,
            next;
        while (cell) {
            next = cell.next;
            delete (<any>cell).value;
            delete cell.prev;
            delete cell.next;
            cell = next;
        }
        delete this.head;
        delete this.tail;
        this._length = 0;
        return true;
    }

    compare(o: DCons<T>) {
        const n = this._length;
        if (n < o._length) {
            return -1;
        } else if (n > o._length) {
            return 1;
        } else if (n === 0) {
            return 0;
        } else {
            let ca = this.head;
            let cb = o.head;
            let res = 0;
            while (ca && res == 0) {
                res = compare(ca.value, cb!.value);
                ca = ca.next;
                cb = cb!.next;
            }
            return res;
        }
    }

    equiv(o: any) {
        if (
            !(o instanceof DCons || isArrayLike(o)) ||
            this._length !== o.length
        ) {
            return false;
        }
        if (!this._length || this === o) return true;
        let cell = this.head;
        for (let x of <any>o) {
            if (!equiv(cell!.value, x)) {
                return false;
            }
            cell = cell!.next;
        }
        return true;
    }

    *[Symbol.iterator]() {
        let cell = this.head;
        while (cell) {
            yield cell.value;
            cell = cell.next;
        }
    }

    /** {@inheritDoc @thi.ng/api#ISeqable.seq} */
    seq(start = 0, end = this.length) {
        if (start >= end || start < 0) return;
        let cell = this.nthCell(start);
        const last = this.nthCell(end - 1);
        const $seq = (cell: ConsCell<T>): ISeq<T> => ({
            first() {
                return cell.value;
            },
            next() {
                return cell !== last && cell.next ? $seq(cell.next) : undefined;
            },
        });
        return cell ? $seq(cell) : undefined;
    }

    *cycle() {
        while (true) {
            yield* this;
        }
    }

    /** {@inheritDoc @thi.ng/transducers#IReducible.$reduce} */
    $reduce(rfn: ReductionFn<any, T>, acc: any) {
        let cell = this.head;
        while (cell && !isReduced(acc)) {
            acc = rfn(acc, cell.value);
            cell = cell.next;
        }
        return acc;
    }

    drop() {
        const cell = this.head;
        if (cell) {
            this.head = cell.next;
            if (this.head) {
                delete this.head.prev;
            } else {
                delete this.tail;
            }
            this._length--;
            return cell.value;
        }
    }

    cons(value: T): DCons<T> {
        const cell = <ConsCell<T>>{ value, next: this.head };
        if (this.head) {
            this.head.prev = cell;
        } else {
            this.tail = cell;
        }
        this.head = cell;
        this._length++;
        return this;
    }

    insertBefore(cell: ConsCell<T>, value: T): DCons<T> {
        if (!cell) {
            illegalArgs("cell is undefined");
        }
        const newCell = <ConsCell<T>>{ value, next: cell, prev: cell.prev };
        if (cell.prev) {
            cell.prev.next = newCell;
        } else {
            this.head = newCell;
        }
        cell.prev = newCell;
        this._length++;
        return this;
    }

    insertAfter(cell: ConsCell<T>, value: T): DCons<T> {
        if (!cell) {
            illegalArgs("cell is undefined");
        }
        const newCell = <ConsCell<T>>{ value, next: cell.next, prev: cell };
        if (cell.next) {
            cell.next.prev = newCell;
        } else {
            this.tail = newCell;
        }
        cell.next = newCell;
        this._length++;
        return this;
    }

    insertBeforeNth(n: number, x: T) {
        if (n < 0) {
            n += this._length;
        }
        if (n <= 0) {
            return this.cons(x);
        } else {
            ensureIndex(n, 0, this._length);
            return this.insertBefore(this.nthCellUnsafe(n), x);
        }
    }

    insertAfterNth(n: number, x: T) {
        if (n < 0) {
            n += this._length;
        }
        if (n >= this._length - 1) {
            return this.push(x);
        } else {
            ensureIndex(n, 0, this._length);
            return this.insertAfter(this.nthCellUnsafe(n), x);
        }
    }

    insertSorted(value: T, cmp?: Comparator<T>) {
        cmp = cmp || compare;
        let cell = this.head;
        while (cell) {
            if (cmp(value, cell.value) <= 0) {
                return this.insertBefore(cell, value);
            }
            cell = cell.next;
        }
        return this.push(value);
    }

    find(value: T) {
        let cell = this.head;
        while (cell) {
            if (cell.value === value) {
                return cell;
            }
            cell = cell.next;
        }
    }

    findWith(fn: Predicate<T>) {
        let cell = this.head;
        while (cell) {
            if (fn(cell.value)) {
                return cell;
            }
            cell = cell.next;
        }
    }

    concat(...slices: Iterable<T>[]) {
        const res = this.copy();
        for (let slice of slices) {
            res.into(slice);
        }
        return res;
    }

    into(src: Iterable<T>) {
        for (let x of src) {
            this.push(x);
        }
    }

    slice(from = 0, to = this.length) {
        let a = from < 0 ? from + this._length : from;
        let b = to < 0 ? to + this._length : to;
        if (a < 0 || b < 0) {
            illegalArgs("invalid indices: ${from} / ${to}");
        }
        const res = new DCons<T>();
        let cell = this.nthCell(a);
        while (cell && ++a <= b) {
            res.push(cell.value);
            cell = cell.next;
        }
        return res;
    }

    splice(at: ConsCell<T> | number, del = 0, insert?: Iterable<T>): DCons<T> {
        let cell: ConsCell<T> | undefined;
        if (typeof at === "number") {
            if (at < 0) {
                at += this._length;
            }
            ensureIndex(at, 0, this._length);
            cell = this.nthCellUnsafe(at);
        } else {
            cell = at;
        }
        const removed = new DCons<T>();
        if (del > 0) {
            while (cell && del-- > 0) {
                this.remove(cell);
                removed.push(cell.value);
                cell = cell.next;
            }
        } else if (cell) {
            cell = cell.next;
        }
        if (insert) {
            if (cell) {
                for (let i of insert) {
                    this.insertBefore(cell, i);
                }
            } else {
                for (let i of insert) {
                    this.push(i);
                }
            }
        }
        return removed;
    }

    remove(cell: ConsCell<T>) {
        if (cell.prev) {
            cell.prev.next = cell.next;
        } else {
            this.head = cell.next;
        }
        if (cell.next) {
            cell.next.prev = cell.prev;
        } else {
            this.tail = cell.prev;
        }
        this._length--;
        return this;
    }

    swap(a: ConsCell<T>, b: ConsCell<T>): DCons<T> {
        if (a !== b) {
            const t = a.value;
            a.value = b.value;
            b.value = t;
        }
        return this;
    }

    push(value: T): DCons<T> {
        if (this.tail) {
            const cell = <ConsCell<T>>{ value, prev: this.tail };
            this.tail.next = cell;
            this.tail = cell;
            this._length++;
            return this;
        } else {
            return this.cons(value);
        }
    }

    pop() {
        const cell = this.tail;
        if (!cell) {
            return;
        }
        this.tail = cell.prev;
        if (this.tail) {
            delete this.tail.next;
        } else {
            delete this.head;
        }
        this._length--;
        return cell.value;
    }

    first() {
        return this.head && this.head.value;
    }

    peek() {
        return this.tail && this.tail.value;
    }

    setHead(v: T) {
        if (this.head) {
            this.head.value = v;
            return this;
        }
        return this.cons(v);
    }

    setTail(v: T) {
        if (this.tail) {
            this.tail.value = v;
            return this;
        }
        return this.push(v);
    }

    setNth(n: number, v: T) {
        const cell = this.nthCell(n);
        !cell && illegalArgs(`index out of bounds: ${n}`);
        cell!.value = v;
        return this;
    }

    nth(n: number, notFound?: T) {
        const cell = this.nthCell(n);
        return cell ? cell.value : notFound;
    }

    nthCell(n: number) {
        if (n < 0) {
            n += this._length;
        }
        if (n < 0 || n >= this._length) {
            return;
        }
        return this.nthCellUnsafe(n);
    }

    rotateLeft() {
        switch (this._length) {
            case 0:
            case 1:
                return this;
            case 2:
                return this.swap(this.head!, this.tail!);
            default:
                return this.push(this.drop()!);
        }
    }

    rotateRight() {
        switch (this._length) {
            case 0:
            case 1:
                return this;
            case 2:
                return this.swap(this.head!, this.tail!);
            default:
                const x = this.peek();
                this.pop();
                return this.cons(x!);
        }
    }

    map<R>(fn: Fn<T, R>) {
        const res = new DCons<R>();
        let cell = this.head;
        while (cell) {
            res.push(fn(cell.value));
            cell = cell.next;
        }
        return res;
    }

    filter(pred: Predicate<T>) {
        const res = new DCons<T>();
        let cell = this.head;
        while (cell) {
            pred(cell.value) && res.push(cell.value);
            cell = cell.next;
        }
        return res;
    }

    reduce<R>(rfn: ReductionFn<R, T>, initial: R) {
        let acc: R = initial;
        let cell = this.head;
        while (cell) {
            // TODO add early termination support
            acc = <R>rfn(acc, cell.value);
            cell = cell.next;
        }
        return acc;
    }

    /**
     * Shuffles list by probabilistically moving cells to head or tail
     * positions.
     *
     * @remarks
     * Supports configurable iterations and custom PRNG via
     * {@link @thi.ng/random#IRandom} (default:
     * {@link @thi.ng/random#SYSTEM}).
     *
     * Default iterations: `ceil(3/2 * log2(n))`
     *
     * @param iter -
     * @param rnd -
     */
    shuffle(iter?: number, rnd: IRandom = SYSTEM) {
        if (this._length < 2) return this;
        for (
            iter = iter ?? Math.ceil(1.5 * Math.log2(this._length));
            iter > 0;
            iter--
        ) {
            let cell = this.head;
            while (cell) {
                const next = cell.next;
                rnd.float() < 0.5 ? this.asHead(cell) : this.asTail(cell);
                cell = next;
            }
        }
        return this;
    }

    /**
     * Merge sort implementation based on Simon Tatham's algorithm:
     * https://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
     *
     * @remarks
     * Uses {@link @thi.ng/compare#compare} as default comparator.
     *
     * @param cmp -
     */
    sort(cmp: Comparator<T> = compare) {
        if (!this._length) return this;
        let inSize = 1;
        while (true) {
            let p = this.head;
            this.head = undefined;
            this.tail = undefined;
            let numMerges = 0;
            while (p) {
                numMerges++;
                let q: ConsCell<T> | undefined = p;
                let psize = 0;
                for (let i = 0; i < inSize; i++) {
                    psize++;
                    q = q!.next;
                    if (!q) break;
                }
                let qsize = inSize;
                while (psize > 0 || (qsize > 0 && q)) {
                    let e: ConsCell<T> | undefined;
                    if (psize === 0) {
                        e = q;
                        q = q!.next;
                        qsize--;
                    } else if (!q || qsize === 0) {
                        e = p;
                        p = p!.next;
                        psize--;
                    } else if (cmp(p!.value, q!.value) <= 0) {
                        e = p;
                        p = p!.next;
                        psize--;
                    } else {
                        e = q;
                        q = q!.next;
                        qsize--;
                    }
                    if (this.tail) {
                        this.tail!.next = e;
                    } else {
                        this.head = e;
                    }
                    e!.prev = this.tail;
                    this.tail = e;
                }
                p = q;
            }
            this.tail!.next = undefined;
            if (numMerges <= 1) {
                return this;
            }
            inSize *= 2;
        }
    }

    reverse() {
        let head = this.head;
        let tail = this.tail;
        let n = (this._length >>> 1) + (this._length & 1);
        while (head && tail && n > 0) {
            const t = head.value;
            head.value = tail.value;
            tail.value = t;
            head = head.next;
            tail = tail.prev;
            n--;
        }
        return this;
    }

    asHead(cell: ConsCell<T>) {
        if (cell === this.head) {
            return this;
        }
        this.remove(cell);
        this.head!.prev = cell;
        cell.next = this.head;
        cell.prev = undefined;
        this.head = cell;
        this._length++;
        return this;
    }

    asTail(cell: ConsCell<T>) {
        if (cell === this.tail) {
            return this;
        }
        this.remove(cell);
        this.tail!.next = cell;
        cell.prev = this.tail;
        cell.next = undefined;
        this.tail = cell;
        this._length++;
        return this;
    }

    toString() {
        let res: any = [];
        let cell = this.head;
        while (cell) {
            res.push(String(cell.value));
            cell = cell.next;
        }
        return res.join(", ");
    }

    toJSON() {
        return [...this];
    }

    protected nthCellUnsafe(n: number) {
        let cell: ConsCell<T>, dir: keyof ConsCell<T>;
        if (n <= this._length >> 1) {
            cell = this.head!;
            dir = "next";
        } else {
            cell = this.tail!;
            dir = "prev";
            n = this._length - n - 1;
        }
        while (n-- > 0 && cell) {
            cell = cell[dir]!;
        }
        return cell;
    }
}

/**
 * Functional syntax sugar for `new DCons(src?)`.
 *
 * @param src -
 */
export const defDCons = <T>(src?: Iterable<T>) => new DCons(src);

/**
 * @deprecated use {@link defDCons} instead
 */
export const dcons = defDCons;
