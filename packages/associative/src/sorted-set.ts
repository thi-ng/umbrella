import { ICompare } from "@thi.ng/api/api";
import { compare } from "@thi.ng/compare";
import { map } from "@thi.ng/iterators/map";

import { IEquivSet, Pair, SortedSetOpts } from "./api";
import { SortedMap } from "./sorted-map";

const __private = new WeakMap<SortedSet<any>, SortedMap<any, any>>();

/**
 * Sorted set implementation with standard ES6 Set API, customizable
 * value equality and comparison semantics and additional functionality:
 *
 * - range queries (via `entries`, `keys`, `values`)
 * - multiple value addition/deletion via `into()` and `disj()`
 *
 * Furthermore, this class implements the `ICopy`, IEmpty`, `ICompare`
 * and `IEquiv` interfaces defined by `@thi.ng/api`. The latter two
 * allow instances to be used as keys themselves in other data types
 * defined in this (and other) package(s).
 *
 * This set uses a `SortedMap` as backing store and therefore has the
 * same resizing characteristics.
 */
export class SortedSet<T> extends Set<T> implements
    IEquivSet<T>,
    ICompare<Set<T>> {

    /**
     * Creates new instance with optional given values and/or
     * implementation options. The options are the same as used by
     * `SortedMap`.
     *
     * @param values
     * @param opts
     */
    constructor(values?: Iterable<T>, opts?: Partial<SortedSetOpts<T>>) {
        super();
        __private.set(this, new SortedMap<T, T>(
            values ? map((x) => [x, x], values) : null,
            opts
        ));
    }

    [Symbol.iterator](): IterableIterator<T> {
        return this.keys();
    }

    get [Symbol.species]() {
        return SortedSet;
    }

    get size() {
        return __private.get(this).size;
    }

    copy(): SortedSet<T> {
        return new SortedSet<T>(this.keys(), this.opts());
    }

    empty() {
        return new SortedSet<T>(null, { ...this.opts(), capacity: SortedMap.DEFAULT_CAP });
    }

    compare(o: Set<T>) {
        const n = this.size, m = o.size;
        if (n < m) return -1;
        if (n > m) return 1;
        const i = this.entries();
        const j = o.entries();
        let x: IteratorResult<Pair<T, T>>, y: IteratorResult<Pair<T, T>>;
        let c: number;
        while ((x = i.next(), y = j.next(), !x.done && !y.done)) {
            if ((c = compare(x.value[0], y.value[0])) !== 0) {
                return c;
            }
        }
        return 0;
    }

    equiv(o: any) {
        if (this === o) {
            return true;
        }
        if (!(o instanceof Set)) {
            return false;
        }
        if (this.size !== o.size) {
            return false;
        }
        for (let k of this.keys()) {
            if (!o.has(k)) {
                return false;
            }
        }
        return true;
    }

    entries(): IterableIterator<Pair<T, T>> {
        return __private.get(this).entries();
    }

    keys(): IterableIterator<T> {
        return __private.get(this).keys();
    }

    values(): IterableIterator<T> {
        return __private.get(this).values();
    }

    add(value: T) {
        __private.get(this).set(value, value);
        return this;
    }

    into(xs: Iterable<T>) {
        for (let x of xs) {
            this.add(x);
        }
        return this;
    }

    clear(): void {
        __private.get(this).clear();
    }

    first(): T {
        const first = __private.get(this).first();
        return first ? first[0] : undefined;
    }

    delete(value: T): boolean {
        return __private.get(this).delete(value);
    }

    disj(xs: Iterable<T>) {
        for (let x of xs) {
            this.delete(x);
        }
        return this;
    }

    forEach(fn: (val: T, val2: T, set: Set<T>) => void, thisArg?: any): void {
        for (let p of this) {
            fn.call(thisArg, p[0], p[0], this);
        }
    }

    has(value: T): boolean {
        return __private.get(this).has(value);
    }

    get(value: T, notFound?: any) {
        return __private.get(this).get(value, notFound);
    }

    opts(): SortedSetOpts<T> {
        return __private.get(this).opts();
    }
}