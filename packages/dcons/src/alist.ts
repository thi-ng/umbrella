import type {
    Comparator,
    Fn,
    IClear,
    ICopy,
    IEmpty,
    IEquiv,
    IInto,
    ILength,
    IRelease,
    Predicate,
} from "@thi.ng/api";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { compare } from "@thi.ng/compare";
import { equiv } from "@thi.ng/equiv";
import { outOfBounds } from "@thi.ng/errors/out-of-bounds";
import { IReducible, isReduced, ReductionFn } from "@thi.ng/transducers";
import type { ConsCell } from "./api.js";

export abstract class AList<L extends AList<any, T>, T>
    implements
        IClear,
        ICopy<L>,
        IEmpty<L>,
        IEquiv,
        IInto<T, L>,
        Iterable<T>,
        ILength,
        IReducible<any, T>,
        IRelease
{
    _head: ConsCell<T> | undefined;

    protected _length: number = 0;

    constructor(src?: Iterable<T>) {
        src && this.into(src);
    }

    get length() {
        return this._length;
    }

    get head() {
        return this._head;
    }

    abstract get tail(): ConsCell<T> | undefined;

    [Symbol.iterator]() {
        return _iterate("next", this._head);
    }

    reverseIterator() {
        return _iterate("prev", this.tail);
    }

    abstract append(n: T): ConsCell<T>;

    clear() {
        this.release();
    }

    compare(o: L, cmp: Comparator<T> = compare) {
        let n = this._length;
        if (n < o._length) {
            return -1;
        } else if (n > o._length) {
            return 1;
        } else if (n === 0) {
            return 0;
        } else {
            let ca = this._head;
            let cb = o._head;
            let res = 0;
            for (; n-- > 0 && res === 0; ) {
                res = cmp(ca!.value, cb!.value);
                ca = ca!.next;
                cb = cb!.next;
            }
            return res;
        }
    }

    concat(...slices: Iterable<T>[]) {
        const res = this.copy();
        for (let slice of slices) {
            res.into(slice);
        }
        return res;
    }

    abstract copy(): L;

    abstract drop(): T | undefined;

    abstract empty(): L;

    equiv(o: any) {
        if (
            !(o instanceof AList || isArrayLike(o)) ||
            this._length !== o.length
        ) {
            return false;
        }
        if (!this._length || this === o) return true;
        const iter: Iterator<T> = (<any>o)[Symbol.iterator]();
        let cell = this._head;
        for (let n = this._length; n-- > 0; ) {
            if (!equiv(cell!.value, iter.next().value)) {
                return false;
            }
            cell = cell!.next;
        }
        return true;
    }

    filter(fn: Predicate<T>) {
        const res = this.empty();
        this.traverse((x) => (fn(x.value) && res.append(x.value), true));
        return res;
    }

    find(value: T) {
        return this.traverse((x) => x.value !== value);
    }

    findWith(fn: Predicate<T>) {
        return this.traverse((x) => !fn(x.value));
    }

    first() {
        return this._head && this._head.value;
    }

    abstract insertAfter(cell: ConsCell<T>, value: T): ConsCell<T>;

    abstract insertBefore(cell: ConsCell<T>, value: T): ConsCell<T>;

    insertSorted(value: T, cmp?: Comparator<T>) {
        cmp = cmp || compare;
        for (let cell = this._head, n = this._length; n-- > 0; ) {
            if (cmp(value, cell!.value) <= 0) {
                return this.insertBefore(cell!, value);
            }
            cell = cell!.next;
        }
        return this.append(value);
    }

    into(src: Iterable<T>): L {
        for (let x of src) {
            this.append(x);
        }
        return <any>this;
    }

    nth(n: number, notFound?: T) {
        const cell = this.nthCell(n);
        return cell ? cell.value : notFound;
    }

    abstract nthCell(n: number): ConsCell<T> | undefined;

    nthCellUnsafe(n: number) {
        let cell: ConsCell<T> | undefined;
        let dir: keyof ConsCell<T>;
        if (n <= this._length >>> 1) {
            cell = this._head;
            dir = "next";
        } else {
            cell = this.tail;
            dir = "prev";
            n = this._length - n - 1;
        }
        while (n-- > 0 && cell) {
            cell = cell[dir];
        }
        return cell;
    }

    peek() {
        return this.tail && this.tail.value;
    }

    abstract prepend(n: T): ConsCell<T>;

    /** {@inheritDoc @thi.ng/transducers#IReducible.$reduce} */
    $reduce(rfn: ReductionFn<any, T>, acc: any) {
        let cell = this._head;
        for (let n = this._length; n-- > 0 && !isReduced(acc); ) {
            acc = rfn(acc, cell!.value);
            cell = cell!.next;
        }
        return acc;
    }

    reduce<R>(rfn: ReductionFn<R, T>, initial: R): R {
        return this.$reduce(rfn, initial);
    }

    release() {
        let cell = this._head;
        if (!cell) return true;
        let next;
        for (let i = this._length; i-- > 0; ) {
            next = cell!.next;
            delete (<any>cell).value;
            delete cell!.prev;
            delete cell!.next;
            cell = next;
        }
        this._head = undefined;
        this._length = 0;
        return true;
    }

    reverse() {
        let head = this._head;
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

    setHead(v: T) {
        const cell = this._head;
        if (cell) {
            cell.value = v;
            return cell;
        }
        return this.prepend(v);
    }

    setNth(n: number, v: T) {
        const cell = this.nthCell(n);
        !cell && outOfBounds(n);
        cell!.value = v;
        return cell;
    }

    setTail(v: T) {
        const cell = this.tail;
        if (cell) {
            cell.value = v;
            return cell;
        }
        return this.append(v);
    }

    swap(a: ConsCell<T>, b: ConsCell<T>): this {
        if (a !== b) {
            const t = a.value;
            a.value = b.value;
            b.value = t;
        }
        return this;
    }

    toArray(out: T[] = []) {
        this.traverse((x) => (out.push(x.value), true));
        return out;
    }

    toJSON() {
        return this.toArray();
    }

    toString() {
        let res: any = [];
        this.traverse((x) => (res.push(String(x.value)), true));
        return res.join(", ");
    }

    traverse(
        fn: Fn<ConsCell<T>, boolean | number>,
        start: ConsCell<T> | undefined = this._head,
        end?: ConsCell<T> | undefined
    ) {
        if (!this._head) return;
        let cell = start!;
        do {
            if (!fn(cell)) break;
            cell = cell.next!;
        } while (cell !== end);
        return cell;
    }

    protected _map<R extends AList<any, V>, V>(res: R, fn: Fn<T, V>) {
        this.traverse((x) => (res.append(fn(x.value)), true));
        return res;
    }
}

function* _iterate<T>(dir: "next" | "prev", cell?: ConsCell<T>) {
    while (cell) {
        yield cell.value;
        cell = cell[dir]!;
    }
}
