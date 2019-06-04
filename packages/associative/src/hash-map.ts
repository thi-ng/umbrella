import {
    Fn,
    Fn3,
    ICopy,
    IEmpty,
    IEquiv,
    Pair,
    Predicate2
} from "@thi.ng/api";
import { ceilPow2 } from "@thi.ng/binary";
import { equiv } from "@thi.ng/equiv";
import { HashMapOpts } from "./api";

interface HashMapState<K, V> {
    hash: Fn<K, number>;
    equiv: Predicate2<K>;
    load: number;
    bins: Pair<K, V>[];
    mask: number;
    size: number;
}

const __private = new WeakMap<HashMap<any, any>, HashMapState<any, any>>();

const DEFAULT_CAP = 16;

/**
 * Configurable hash map implementation w/ ES6 Map API and using open
 * addressing / linear probing to resolve key collisions. Supports any
 * key types, via user supplied hash function.
 *
 * See `HashMapOpts` for further configuration & behavior details.
 *
 * ```
 * import { HashMap } from "@thi.ng/associative"
 * import { hash } from "@thi.ng/vectors"
 *
 * m = new HashMap([], { hash })
 * m.set([1, 2], "a");
 * m.set([3, 4], "b");
 * m.set([1, 2], "c");
 * // HashMap { [ 1, 2 ] => 'c', [ 3, 4 ] => 'b' }
 * ```
 *
 */
export class HashMap<K, V> extends Map<K, V>
    implements
        Iterable<Pair<K, V>>,
        ICopy<HashMap<K, V>>,
        IEmpty<HashMap<K, V>>,
        IEquiv {
    constructor(pairs: Iterable<Pair<K, V>>, opts: HashMapOpts<K>) {
        super();
        const m = ceilPow2(Math.min(opts.cap || DEFAULT_CAP, 4)) - 1;
        __private.set(this, {
            hash: opts.hash,
            equiv: opts.equiv || equiv,
            load: opts.load || 0.75,
            mask: m,
            bins: new Array(m + 1),
            size: 0
        });
        if (pairs) {
            this.into(pairs);
        }
    }

    get [Symbol.species]() {
        return HashMap;
    }

    get [Symbol.toStringTag]() {
        return "HashMap";
    }

    get size(): number {
        return __private.get(this).size;
    }

    [Symbol.iterator]() {
        return this.entries();
    }

    *entries(): IterableIterator<Pair<K, V>> {
        for (let p of __private.get(this).bins) {
            if (p) yield [p[0], p[1]];
        }
    }

    *keys(): IterableIterator<K> {
        for (let p of __private.get(this).bins) {
            if (p) yield p[0];
        }
    }

    *values(): IterableIterator<V> {
        for (let p of __private.get(this).bins) {
            if (p) yield p[1];
        }
    }

    forEach(fn: Fn3<V, Readonly<K>, Map<K, V>, void>, thisArg?: any) {
        for (let pair of __private.get(this).bins) {
            fn.call(thisArg, pair[1], pair[0], this);
        }
    }

    clear() {
        const $this = __private.get(this);
        $this.bins = new Array(DEFAULT_CAP);
        $this.mask = 15;
        $this.size = 0;
    }

    empty() {
        return new HashMap<K, V>(null, this.opts({ cap: DEFAULT_CAP }));
    }

    copy() {
        const $this = __private.get(this);
        const m = new HashMap<K, V>(null, this.opts({ cap: 4 }));
        Object.assign(__private.get(m), {
            bins: $this.bins.slice(),
            mask: $this.mask,
            size: $this.size
        });
        return m;
    }

    equiv(o: any) {
        if (this === o) {
            return true;
        }
        if (!(o instanceof Map)) {
            return false;
        }
        if (this.size !== o.size) {
            return false;
        }
        for (let p of __private.get(this).bins) {
            if (p && !equiv(o.get(p[0]), p[1])) {
                return false;
            }
        }
        return true;
    }

    has(key: K) {
        const $this = __private.get(this);
        const i = this.find(key, $this);
        return i >= 0 && $this.bins[i] != undefined;
    }

    get(key: K, notFound?: V): V | undefined {
        const $this = __private.get(this);
        const i = this.find(key, $this);
        return i >= 0 && $this.bins[i] ? $this.bins[i][1] : notFound;
    }

    set(key: K, val: V) {
        const $this = __private.get(this);
        let i = this.find(key, $this);
        if (i >= 0 && $this.bins[i]) {
            $this.bins[i][1] = val;
            return this;
        }
        if ($this.size > $this.mask * $this.load) {
            this.resize($this);
            i = this.find(key, $this);
        }
        $this.bins[i] = [key, val];
        $this.size++;
        return this;
    }

    delete(key: K) {
        const $this = __private.get(this);
        let i = this.find(key, $this);
        const bins = $this.bins;
        if (i >= 0 && !bins[i]) {
            return false;
        }
        $this.size--;
        const m = $this.mask;
        let j = i;
        let k: number;
        while (true) {
            bins[i] = undefined;
            do {
                j = (j + 1) & m;
                if (!bins[j]) return true;
                k = $this.hash(bins[j][0]) & m;
            } while (i <= j ? i < k && k <= j : i < k || k <= j);
            bins[i] = bins[j];
            i = j;
        }
    }

    into(pairs: Iterable<Pair<K, V>>) {
        for (let p of pairs) {
            this.set(p[0], p[1]);
        }
        return this;
    }

    dissoc(...keys: K[]) {
        for (let k of keys) {
            this.delete(k);
        }
        return this;
    }

    opts(overrides?: Partial<HashMapOpts<K>>) {
        const $this = __private.get(this);
        return <HashMapOpts<K>>{
            hash: $this.hash,
            equiv: $this.equiv,
            load: $this.load,
            cap: $this.mask + 1,
            ...overrides
        };
    }

    protected find(key: K, $this: HashMapState<K, V>) {
        const m = $this.mask;
        const bins = $this.bins;
        const equiv = $this.equiv;
        let i = m;
        let h = $this.hash(key) & m;
        while (bins[h] && !equiv(bins[h][0], key)) {
            i--;
            if (i < 0) return -1;
            h = (h + 1) & $this.mask;
        }
        return h;
    }

    protected resize($this: HashMapState<K, V>) {
        const src = $this.bins;
        const cap = ($this.mask + 1) * 2;
        $this.bins = new Array(cap);
        $this.mask = cap - 1;
        $this.size = 0;
        for (let p of src) {
            if (p) this.set(p[0], p[1]);
        }
    }
}
