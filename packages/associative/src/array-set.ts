import { Fn3, Pair, Predicate2, SEMAPHORE } from "@thi.ng/api";
import { findIndex } from "@thi.ng/arrays";
import { equiv } from "@thi.ng/equiv";
import type { EquivSetOpts, IEquivSet } from "./api";
import { dissoc } from "./dissoc";
import { equivSet } from "./internal/equiv";
import { inspectable } from "./internal/inspect";
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
 * Additionally, the type also implements the {@link @thi.ng/api#ICopy},
 * {@link @thi.ng/api#IEmpty} and {@link @thi.ng/api#IEquiv} interfaces
 * itself.
 */
@inspectable
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
        const { equiv, vals } = __private.get(this)!;
        const s = new ArraySet<T>(null, { equiv });
        __private.get(s)!.vals = vals.slice();
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
     * @param key - search key
     * @param notFound - default value
     */
    get(key: T, notFound?: T): T | undefined {
        const { equiv, vals } = __private.get(this)!;
        const i = findIndex(vals, key, equiv);
        return i >= 0 ? vals[i] : notFound;
    }

    delete(key: T) {
        const { equiv, vals } = __private.get(this)!;
        for (let i = vals.length; --i >= 0; ) {
            if (equiv(vals[i], key)) {
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

    /**
     * The value args given to the callback `fn` MUST be treated as
     * readonly/immutable. This could be enforced via TS, but would
     * break ES6 Set interface contract.
     *
     * @param fn
     * @param thisArg
     */
    forEach(fn: Fn3<T, T, Set<T>, void>, thisArg?: any) {
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

export const defArraySet = <T>(
    vals?: Iterable<T> | null,
    opts?: Partial<EquivSetOpts<T>>
) => new ArraySet(vals, opts);
