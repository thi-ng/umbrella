import { ICopy, IEmpty, IEquiv, Predicate2 } from "@thi.ng/api/api";
import { equiv } from "@thi.ng/api/equiv";
import { DCons } from "@thi.ng/dcons";

import { ArraySetOpts, Pair, SEMAPHORE } from "./api";

interface SetProps<T> {
    vals: DCons<T>;
    equiv: Predicate2<T>;
}

const __private = new WeakMap<ArraySet<any>, SetProps<any>>();

/**
 * An alternative set implementation to the native ES6 Set type. Uses
 * customizable equality/equivalence predicate and so is more useful
 * when dealing with structured data. Implements full API of native Set
 * and by the default uses `@thi.ng/api/equiv` for equivalence checking.
 *
 * Additionally, the type also implements the `ICopy`, `IEmpty` and
 * `IEquiv` interfaces itself.
 */
export class ArraySet<T> extends Set<T> implements
    Iterable<T>,
    ICopy<ArraySet<T>>,
    IEmpty<ArraySet<T>>,
    IEquiv {

    constructor(vals?: Iterable<T>, eq: Predicate2<T> = equiv) {
        super();
        __private.set(this, { equiv: eq, vals: new DCons<T>() });
        vals && this.into(vals);
    }

    *[Symbol.iterator]() {
        yield* __private.get(this).vals;
    }

    get [Symbol.species]() {
        return ArraySet;
    }

    get size() {
        return __private.get(this).vals.length;
    }

    copy() {
        const $this = __private.get(this);
        const s = new ArraySet<T>(null, $this.equiv);
        __private.get(s).vals = $this.vals.copy();
        return s;
    }

    empty() {
        return new ArraySet<T>(null, __private.get(this).equiv);
    }

    clear() {
        __private.get(this).vals.clear();
    }

    first() {
        if (this.size) {
            return __private.get(this).vals.head.value;
        }
    }

    add(x: T) {
        !this.has(x) && __private.get(this).vals.push(x);
        return this;
    }

    into(xs: Iterable<T>) {
        for (let x of xs) {
            this.add(x);
        }
        return this;
    }

    has(x: T) {
        return this.get(x, SEMAPHORE) !== SEMAPHORE;
    }

    /**
     * Returns the canonical value for `x`, if present. If the set
     * contains no equivalent for `x`, returns `notFound`.
     *
     * @param x
     * @param notFound
     */
    get(x: T, notFound?: any) {
        const $this = __private.get(this);
        const eq = $this.equiv;
        let i = $this.vals.head;
        while (i) {
            if (eq(i.value, x)) {
                return i.value;
            }
            i = i.next;
        }
        return notFound;
    }

    delete(x: T) {
        const $this = __private.get(this)
        const eq = $this.equiv;
        let i = $this.vals.head;
        while (i) {
            if (eq(i.value, x)) {
                $this.vals.splice(i, 1);
                return true;
            }
            i = i.next;
        }
        return false;
    }

    disj(...xs: T[]) {
        for (let x of xs) {
            this.delete(x);
        }
        return this;
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
        let i = __private.get(this).vals.head;
        while (i) {
            if (!o.has(i.value)) {
                return false;
            }
            i = i.next;
        }
        return true;
    }

    forEach(fn: (val: T, val2: T, set: Set<T>) => void, thisArg?: any) {
        let i = __private.get(this).vals.head;
        while (i) {
            fn.call(thisArg, i.value, i.value, this);
            i = i.next;
        }
    }

    *entries(): IterableIterator<Pair<T, T>> {
        for (let v of __private.get(this).vals) {
            yield [v, v];
        }
    }

    *keys() {
        yield* __private.get(this).vals;
    }

    *values() {
        yield* this.keys();
    }

    getOpts(): ArraySetOpts<T> {
        return { equiv: __private.get(this).equiv };
    }
}
