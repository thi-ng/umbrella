import { SEMAPHORE } from "@thi.ng/api";
import { isPlainObject } from "@thi.ng/checks";
import { equiv } from "@thi.ng/equiv";
import { pairs } from "@thi.ng/transducers";
import { ArraySet } from "./array-set";
import { dissoc } from "./dissoc";
import { equivMap } from "./internal/equiv";
import { inspectable } from "./internal/inspect";
import { into } from "./into";
import type { Fn3, ICopy, IEmpty, IEquiv, IObjectOf, Pair } from "@thi.ng/api";
import type { EquivMapOpts, IEquivSet } from "./api";

interface MapProps<K, V> {
    keys: IEquivSet<K>;
    map: Map<K, V>;
    opts: EquivMapOpts<K>;
}

const __private = new WeakMap<EquivMap<any, any>, MapProps<any, any>>();

const __map = (map: EquivMap<any, any>) => __private.get(map)!.map;

@inspectable
export class EquivMap<K, V> extends Map<K, V>
    implements
        Iterable<Pair<K, V>>,
        ICopy<EquivMap<K, V>>,
        IEmpty<EquivMap<K, V>>,
        IEquiv {
    /**
     * Creates a new instance with optional initial key-value pairs and
     * provided options. If no `opts` are given, uses `ArraySet` for
     * storing canonical keys and {@link @thi.ng/equiv#equiv} for
     * checking key equivalence.
     *
     * @param pairs - key-value pairs
     * @param opts - config options
     */
    constructor(
        pairs?: Iterable<Pair<K, V>> | null,
        opts?: Partial<EquivMapOpts<K>>
    ) {
        super();
        const _opts: EquivMapOpts<K> = { equiv, keys: ArraySet, ...opts };
        __private.set(this, {
            keys: new _opts.keys(null, { equiv: _opts.equiv }),
            map: new Map<K, V>(),
            opts: _opts,
        });
        if (pairs) {
            this.into(pairs);
        }
    }

    [Symbol.iterator](): IterableIterator<Pair<K, V>> {
        return this.entries();
    }

    get [Symbol.species]() {
        return EquivMap;
    }

    get [Symbol.toStringTag]() {
        return "EquivMap";
    }

    get size(): number {
        return __private.get(this)!.keys.size;
    }

    clear() {
        const $this = __private.get(this)!;
        $this.keys.clear();
        $this.map.clear();
    }

    empty(): EquivMap<K, V> {
        return new EquivMap<K, V>(null, __private.get(this)!.opts);
    }

    copy() {
        const $this = __private.get(this)!;
        const m = new EquivMap<K, V>();
        __private.set(m, {
            keys: $this.keys.copy(),
            map: new Map<K, V>($this.map),
            opts: $this.opts,
        });
        return m;
    }

    equiv(o: any) {
        return equivMap(this, o);
    }

    delete(key: K) {
        const $this = __private.get(this)!;
        key = $this.keys.get(key, SEMAPHORE);
        if (key !== <any>SEMAPHORE) {
            $this.map.delete(key);
            $this.keys.delete(key);
            return true;
        }
        return false;
    }

    dissoc(keys: Iterable<K>) {
        return <this>dissoc(this, keys);
    }

    /**
     * The key & value args given the callback `fn` MUST be treated as
     * readonly/immutable. This could be enforced via TS, but would
     * break ES6 Map interface contract.
     *
     * @param fn
     * @param thisArg
     */
    forEach(fn: Fn3<V, K, Map<K, V>, void>, thisArg?: any) {
        for (let pair of __map(this)) {
            fn.call(thisArg, pair[1], pair[0], this);
        }
    }

    get(key: K, notFound?: V): V | undefined {
        const $this = __private.get(this)!;
        key = $this.keys.get(key, SEMAPHORE);
        if (key !== <any>SEMAPHORE) {
            return $this.map.get(key);
        }
        return notFound;
    }

    has(key: K): boolean {
        return __private.get(this)!.keys.has(key);
    }

    set(key: K, value: V) {
        const $this = __private.get(this)!;
        const k = $this.keys.get(key, SEMAPHORE);
        if (k !== <any>SEMAPHORE) {
            $this.map.set(k, value);
        } else {
            $this.keys.add(key);
            $this.map.set(key, value);
        }
        return this;
    }

    into(pairs: Iterable<Pair<K, V>>) {
        return <this>into(this, pairs);
    }

    entries(): IterableIterator<Pair<K, V>> {
        return __map(this).entries();
    }

    keys(): IterableIterator<K> {
        return __map(this).keys();
    }

    values(): IterableIterator<V> {
        return __map(this).values();
    }

    opts(): EquivMapOpts<K> {
        return __private.get(this)!.opts;
    }
}

export function defEquivMap<K, V>(
    pairs?: Iterable<Pair<K, V>> | null,
    opts?: Partial<EquivMapOpts<K>>
): EquivMap<K, V>;
export function defEquivMap<V>(
    obj: IObjectOf<V>,
    opts?: Partial<EquivMapOpts<string>>
): EquivMap<string, V>;
export function defEquivMap<V>(
    src: any,
    opts?: Partial<EquivMapOpts<any>>
): EquivMap<any, V> {
    return new EquivMap(
        isPlainObject(src) ? pairs(<IObjectOf<V>>src) : src,
        opts
    );
}
