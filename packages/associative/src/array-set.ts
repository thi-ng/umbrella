import {
    Fn3,
    Pair,
    Predicate2,
    SEMAPHORE
} from "@thi.ng/api";
import { equiv } from "@thi.ng/equiv";
import { EquivSetOpts, IEquivSet } from "./api";
import { dissoc } from "./dissoc";
import { equivSet } from "./internal/equiv";
import { into } from "./into";

interface ArraySetProps<T> {
    vals: T[];
    equiv: Predicate2<T>;
}

const __private = new WeakMap<ArraySet<any>, ArraySetProps<any>>();

const __vals = (inst: ArraySet<any>) => __private.get(inst)!.vals;

/**
 * An alternative set implementation to the native ES6 Set type. Uses
 * customizable equality/equivalence predicate and so is more useful
 * when dealing with structured data. Implements full API of native Set
 * and by the default uses {@link @thi.ng/equiv#equiv} for equivalence
 * checking.
 *
 * Additionally, the type also implements the `ICopy`, `IEmpty` and
 * `IEquiv` interfaces itself.
 */
export class ArraySet<T> extends Set<T> implements IEquivSet<T> {
    constructor(
        vals?: Iterable<T> | null,
        opts: Partial<EquivSetOpts<T>> = {}
    ) {
        super();
        __private.set(this, { equiv: opts.equiv || equiv, vals: [] });
        vals && this.into(vals);
    }

    *[Symbol.iterator](): IterableIterator<T> {
        yield* __vals(this);
    }

    get [Symbol.species]() {
        return ArraySet;
    }

    get [Symbol.toStringTag]() {
        return "ArraySet";
    }

    get size(): number {
        return __vals(this).length;
    }

    copy(): ArraySet<T> {
        const $this = __private.get(this)!;
        const s = new ArraySet<T>(null, { equiv: $this.equiv });
        __private.get(s)!.vals = $this.vals.slice();
        return s;
    }

    empty() {
        return new ArraySet<T>(null, this.opts());
    }

    clear() {
        __vals(this).length = 0;
    }

    first(): T | undefined {
        if (this.size) {
            return __vals(this)[0];
        }
    }

    add(key: T) {
        !this.has(key) && __vals(this).push(key);
        return this;
    }

    into(keys: Iterable<T>) {
        return <this>into(this, keys);
    }

    has(key: T) {
        return this.get(key, <any>SEMAPHORE) !== <any>SEMAPHORE;
    }

    /**
     * Returns the canonical value for `x`, if present. If the set
     * contains no equivalent for `x`, returns `notFound`.
     *
     * @param key -
     * @param notFound -
     */
    get(key: T, notFound?: T): T | undefined {
        const $this = __private.get(this)!;
        const eq = $this.equiv;
        const vals = $this.vals;
        for (let i = vals.length; --i >= 0; ) {
            if (eq(vals[i], key)) {
                return vals[i];
            }
        }
        return notFound;
    }

    delete(key: T) {
        const $this = __private.get(this)!;
        const eq = $this.equiv;
        const vals = $this.vals;
        for (let i = vals.length; --i >= 0; ) {
            if (eq(vals[i], key)) {
                vals.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    disj(keys: Iterable<T>) {
        return <this>dissoc(this, keys);
    }

    equiv(o: any) {
        return equivSet(this, o);
    }

    forEach(fn: Fn3<Readonly<T>, Readonly<T>, Set<T>, void>, thisArg?: any) {
        const vals = __vals(this);
        for (let i = vals.length; --i >= 0; ) {
            const v = vals[i];
            fn.call(thisArg, v, v, this);
        }
    }

    *entries(): IterableIterator<Pair<T, T>> {
        for (let v of __vals(this)) {
            yield [v, v];
        }
    }

    *keys(): IterableIterator<T> {
        yield* __vals(this);
    }

    *values(): IterableIterator<T> {
        yield* __vals(this);
    }

    opts(): EquivSetOpts<T> {
        return { equiv: __private.get(this)!.equiv };
    }
}
