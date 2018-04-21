import { DHeapOpts } from "./api";
import { Heap } from "./heap";

/**
 * Generic d-ary heap / priority queue with configurable fanout (default
 * = 4) and ordering via user-supplied comparator. By default,
 * implements min-heap ordering and uses @thi.ng/api/compare. The fanout
 * value will be coerced to a power of 2.
 *
 * https://en.wikipedia.org/wiki/D-ary_heap
 */
export class DHeap<T> extends Heap<T> {

    protected d: number;
    protected shift: number;

    constructor(values?: Iterable<T>, opts?: DHeapOpts<T>) {
        super(null, opts);
        const d = (opts && opts.d) || 4;
        this.shift = (Math.log(d) / Math.LN2) | 0;
        this.d = 1 << this.shift;
        if (values) {
            this.into(values);
        }
    }

    empty() {
        return new DHeap<T>(null, { compare: this.compare, d: this.d });
    }

    push(val: T) {
        const vals = this.values;
        const shift = this.shift;
        const cmp = this.compare;
        let pos = this.values.length;
        let parent;
        vals.push(val);
        while (pos > 0 && cmp(vals[pos], vals[parent = pos >> shift]) < 0) {
            const tmp = vals[parent];
            vals[parent] = vals[pos];
            vals[pos] = tmp;
            pos = parent;
        }
        return val;
    }

    protected propagateUp(from = 0, to?: number) {
        if (to === 0) { return; }
        const vals = this.values;
        const d = this.d;
        const cmp = this.compare;
        let pos, offset, i, j;
        to = to || vals.length - 1;

        while (true) {
            pos = from;
            offset = d * pos;
            for (i = offset + 1, j = offset + d; i <= j; i++) {
                if (i <= to && cmp(vals[i], vals[pos]) < 0) {
                    pos = i;
                }
            }
            if (pos === from) {
                return;
            }
            const tmp = vals[from];
            vals[from] = vals[pos];
            vals[pos] = tmp;
            from = pos;
        }
    }
}
