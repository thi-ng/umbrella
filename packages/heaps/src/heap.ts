import { ICopy, ILength, IEmpty, Comparator } from "@thi.ng/api/api";
import { compare } from "@thi.ng/api/compare";

import { HeapOpts } from "./api";

/**
 * Generic binary heap / priority queue with customizable ordering via
 * user-supplied comparator. By default, implements min-heap ordering
 * and uses @thi.ng/api/compare.
 *
 * ```
 * h = new Heap([20, 5, 10]);
 * h.push(15);
 *
 * h.pop(); // 5
 * h.pop(); // 10
 * h.pop(); // 15
 * h.pop(); // 20
 * h.pop(); // undefined
 * ```
 */
export class Heap<T> implements
    ICopy<Heap<T>>,
    IEmpty<Heap<T>>,
    ILength {

    static parentIndex(idx: number) {
        return idx > 0 ? (idx - 1) >> 1 : -1;
    }

    static siblingIndex(idx: number) {
        return idx > 0 ? idx + 1 - ((idx & 1) << 1) : -1;
    }

    static childIndex(idx: number) {
        return idx >= 0 ? (idx << 1) + 1 : -1;
    }

    protected values: T[];
    protected compare: Comparator<T>;

    constructor(values?: Iterable<T>, opts?: HeapOpts<T>) {
        opts = Object.assign({ compare: compare }, opts);
        this.compare = opts.compare;
        this.values = [];
        if (values) {
            this.into(values);
        }
    }

    *[Symbol.iterator]() {
        yield* this.values;
    }

    get length() {
        return this.values.length;
    }

    copy() {
        const h = this.empty();
        h.values = this.values.slice();
        return h;
    }

    clear() {
        this.values.length = 0;
    }

    empty() {
        return new Heap<T>(null, { compare: this.compare });
    }

    peek() {
        return this.values[0];
    }

    push(val: T) {
        this.values.push(val);
        this.percolateUp(this.values.length - 1);
        return this;
    }

    pop() {
        const vals = this.values;
        const tail = vals.pop();
        let res: T;
        if (vals.length > 0) {
            res = vals[0];
            vals[0] = tail;
            this.percolateDown(0);
        } else {
            res = tail;
        }
        return res;
    }

    pushPop(val: T) {
        const vals = this.values;
        const head = vals[0];
        if (vals.length > 0 && this.compare(head, val) < 0) {
            vals[0] = val;
            val = head;
            this.percolateDown(0);
        }
        return val;
    }

    into(vals: Iterable<T>) {
        for (let v of vals) {
            this.push(v);
        }
        return this;
    }

    replaceHead(val: T) {
        const res = this.values[0];
        this.values[0] = val;
        this.percolateDown(0);
        return res;
    }

    heapify() {
        for (var i = (this.values.length - 1) >> 1; i >= 0; i--) {
            this.percolateDown(i);
        }
    }

    *sorted() {
        const h = this.copy();
        let x: T;
        while ((x = h.pop()) !== undefined) {
            yield x;
        }
    }

    parent(n: number) {
        n = Heap.parentIndex(n);
        return n >= 0 ? this.values[n] : undefined;
    }

    children(n: number) {
        n = Heap.childIndex(n);
        const vals = this.values;
        const m = vals.length;
        if (n >= m) return;
        if (n === m - 1) return [vals[n]];
        return [vals[n], vals[n + 1]];
    }

    leaves() {
        const vals = this.values;
        if (!vals.length) {
            return []
        }
        return vals.slice(Heap.parentIndex(vals.length - 1) + 1);
    }

    protected percolateUp(i: number) {
        const vals = this.values;
        const node = vals[i];
        const cmp = this.compare;
        while (i > 0) {
            const pi = (i - 1) >> 1;
            const parent = vals[pi];
            if (cmp(node, parent) >= 0) {
                break;
            }
            vals[pi] = node;
            vals[i] = parent;
            i = pi;
        }
    }

    protected percolateDown(i: number) {
        const vals = this.values;
        const n = vals.length;
        const node = vals[i];
        const cmp = this.compare;
        let child = (i << 1) + 1;
        while (child < n) {
            const next = child + 1;
            if (next < n && cmp(vals[child], vals[next]) >= 0) {
                child = next;
            }
            if (cmp(vals[child], node) < 0) {
                vals[i] = vals[child];
            } else {
                break;
            }
            i = child;
            child = (i << 1) + 1;
        }
        vals[i] = node;
    }
}
