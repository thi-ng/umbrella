import { ICopy, IEmpty, IEquiv, Predicate2 } from "@thi.ng/api/api";
import { equiv } from "@thi.ng/api/equiv";
import { DCons } from "@thi.ng/dcons";
import { SEMAPHORE } from "./api";

/**
 * An alternative set implementation to the native ES6 Set type. Uses
 * customizable equality/equivalence predicate and so is more useful
 * when dealing with structured data. Implements full API of native Set
 * and by the default uses `@thi.ng/api/equiv` for equivalence checking.
 *
 * Additionally, the type also implements the `ICopy`, `IEmpty` and
 * `IEquiv` interfaces itself.
 */
export class EquivSet<T> extends Set<T> implements
    Iterable<T>,
    ICopy<EquivSet<T>>,
    IEmpty<EquivSet<T>>,
    IEquiv {

    protected _vals: DCons<T>;
    protected _equiv: Predicate2<T>;

    constructor(vals?: Iterable<T>, eq: Predicate2<T> = equiv) {
        super();
        this._equiv = eq;
        this._vals = new DCons<T>();
        Object.defineProperties(this, {
            _vals: { enumerable: false },
            _equiv: { enumerable: false }
        });
        vals && this.into(vals);
    }

    *[Symbol.iterator]() {
        yield* this._vals;
    }

    get [Symbol.species]() {
        return EquivSet;
    }

    get size() {
        return this._vals.length;
    }

    copy() {
        const s = new EquivSet<T>(null, this._equiv);
        s._vals = this._vals.copy();
        return s;
    }

    empty() {
        return new EquivSet<T>(null, this._equiv);
    }

    clear() {
        this._vals.clear();
    }

    add(x: T) {
        !this.has(x) && this._vals.push(x);
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
        const eq = this._equiv;
        let i = this._vals.head;
        while (i) {
            if (eq(i.value, x)) {
                return i.value;
            }
            i = i.next;
        }
        return notFound;
    }

    delete(x: T) {
        const eq = this._equiv;
        let i = this._vals.head;
        while (i) {
            if (eq(i.value, x)) {
                this._vals.splice(i, 1);
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
        let i = this._vals.head;
        while (i) {
            if (!o.has(i.value)) {
                return false;
            }
            i = i.next;
        }
        return true;
    }

    forEach(fn: (val: T, val2: T, set: Set<T>) => void, thisArg?: any) {
        let i = this._vals.head;
        while (i) {
            fn.call(thisArg, i.value, i.value, this);
            i = i.next;
        }
    }

    *entries(): IterableIterator<[T, T]> {
        for (let v of this._vals) {
            yield [v, v];
        }
    }

    *keys() {
        yield* this._vals;
    }

    *values() {
        yield* this._vals;
    }
}
