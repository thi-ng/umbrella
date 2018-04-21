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

    empty() {
        return new Heap<T>(null, { compare: this.compare });
    }

    peek() {
        return this.values[0];
    }

    push(val: T) {
        this.values.push(val);
        return this.propagateDown(0, this.values.length - 1);
    }

    pop() {
        const vals = this.values;
        const tail = vals.pop();
        let res: T;
        if (vals.length > 0) {
            res = vals[0];
            vals[0] = tail;
            this.propagateUp(0);
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
            this.propagateUp(0);
        }
        return val;
    }

    into(vals: Iterable<T>) {
        for (let v of vals) {
            this.push(v);
        }
    }

    replaceHead(val: T) {
        const res = this.values[0];
        this.values[0] = val;
        this.propagateUp(0);
        return res;
    }

    protected propagateDown(from: number, to: number) {
        const vals = this.values;
        const newVal = vals[to];
        const cmp = this.compare;
        while (to > from) {
            const p = (to - 1) >> 1;
            const parent = vals[p];
            if (cmp(newVal, parent) < 0) {
                vals[to] = parent;
                to = p;
                continue;
            }
            break;
        }
        return vals[to] = newVal;
    }

    protected propagateUp(pos: number, to?: number) {
        if (to === 0) { return; }
        const vals = this.values;
        const newVal = vals[pos];
        const from = pos;
        const cmp = this.compare;
        to = to || vals.length - 1;
        let child = (pos << 1) + 1;
        while (child <= to) {
            const next = child + 1;
            if (next <= to && cmp(vals[child], vals[next]) >= 0) {
                child = next;
            }
            vals[pos] = vals[child];
            pos = child;
            child = (pos << 1) + 1;
        }
        vals[pos] = newVal;
        this.propagateDown(from, pos);
    }
}
