import type {
    Fn,
    Fn3,
    ICopy,
    IEmpty,
    IEquiv,
    IObjectOf,
    Pair,
    Predicate2,
} from "@thi.ng/api";
import { ceilPow2 } from "@thi.ng/binary/pow";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { equiv } from "@thi.ng/equiv";
import { map } from "@thi.ng/transducers/xform/map";
import type { HashMapOpts } from "./api";
import { dissoc } from "./dissoc";
import { equivMap } from "./internal/equiv";
import { inspectable } from "./internal/inspect";
import { into } from "./into";

interface HashMapState<K, V> {
    hash: Fn<K, number>;
    equiv: Predicate2<K>;
    load: number;
    bins: Pair<K, V>[];
    mask: number;
    size: number;
}

const __private = new WeakMap<HashMap<any, any>, HashMapState<any, any>>();

const __iterator = <K, V>(map: HashMap<K, V>, id: 0 | 1) =>
    function* () {
        for (let p of __private.get(map)!.bins) {
            if (p) yield p[id];
        }
    };

const DEFAULT_CAP = 16;
const DEFAULT_LOAD = 0.75;

/**
 * Configurable hash map implementation w/ ES6 Map API. Uses open
 * addressing / linear probing to resolve key collisions. Supports any
 * key types via mandatory user supplied hash function.
 *
 * See {@link HashMapOpts} for further configuration & behavior details.
 *
 * @example
 * ```ts
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
@inspectable
export class HashMap<K, V>
    extends Map<K, V>
    implements
        Iterable<Pair<K, V>>,
        ICopy<HashMap<K, V>>,
        IEmpty<HashMap<K, V>>,
        IEquiv
{
    constructor(pairs: Iterable<Pair<K, V>> | null, opts: HashMapOpts<K>) {
        super();
        const m = ceilPow2(Math.min(opts.cap || DEFAULT_CAP, 4)) - 1;
        __private.set(this, {
            hash: opts.hash,
            equiv: opts.equiv || equiv,
            load: opts.load || DEFAULT_LOAD,
            mask: m,
            bins: new Array(m + 1),
            size: 0,
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
        return __private.get(this)!.size;
    }

    [Symbol.iterator]() {
        return this.entries();
    }

    *entries(): IterableIterator<Pair<K, V>> {
        for (let p of __private.get(this)!.bins) {
            if (p) yield [p[0], p[1]];
        }
    }

    keys(): IterableIterator<K> {
        return __iterator(this, 0)();
    }

    values(): IterableIterator<V> {
        return __iterator(this, 1)();
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
        for (let pair of __private.get(this)!.bins) {
            fn.call(thisArg, pair[1], pair[0], this);
        }
    }

    clear() {
        const $this = __private.get(this)!;
        $this.bins = new Array(DEFAULT_CAP);
        $this.mask = 15;
        $this.size = 0;
    }

    empty() {
        return new HashMap<K, V>(null, this.opts({ cap: DEFAULT_CAP }));
    }

    copy() {
        const $this = __private.get(this)!;
        const m = new HashMap<K, V>(null, this.opts({ cap: 4 }));
        Object.assign(__private.get(m), {
            bins: $this.bins.slice(),
            mask: $this.mask,
            size: $this.size,
        });
        return m;
    }

    equiv(o: any) {
        return equivMap(this, o);
    }

    has(key: K): boolean {
        const $this = __private.get(this)!;
        const i = this.find(key, $this);
        return i >= 0 && $this.bins[i] != undefined;
    }

    get(key: K, notFound?: V): V | undefined {
        const $this = __private.get(this)!;
        const i = this.find(key, $this);
        return i >= 0 && $this.bins[i] ? $this.bins[i][1] : notFound;
    }

    set(key: K, val: V) {
        const $this = __private.get(this)!;
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
        const $this = __private.get(this)!;
        const { bins, mask } = $this;
        let i = this.find(key, $this);
        if (i >= 0 && !bins[i]) {
            return false;
        }
        $this.size--;
        let j = i;
        let k: number;
        while (true) {
            delete bins[i];
            do {
                j = (j + 1) & mask;
                if (!bins[j]) return true;
                k = $this.hash(bins[j][0]) & mask;
            } while (i <= j ? i < k && k <= j : i < k || k <= j);
            bins[i] = bins[j];
            i = j;
        }
    }

    into(pairs: Iterable<Pair<K, V>>) {
        return <this>into(this, pairs);
    }

    dissoc(keys: Iterable<K>) {
        return <this>dissoc(this, keys);
    }

    opts(overrides?: Partial<HashMapOpts<K>>): HashMapOpts<K> {
        const $this = __private.get(this)!;
        return <HashMapOpts<K>>{
            hash: $this.hash,
            equiv: $this.equiv,
            load: $this.load,
            cap: $this.mask + 1,
            ...overrides,
        };
    }

    protected find(key: K, $this: HashMapState<K, V>) {
        const { bins, equiv, mask } = $this;
        let i = mask;
        let h = $this.hash(key) & mask;
        while (bins[h] && !equiv(bins[h][0], key)) {
            i--;
            if (i < 0) return -1;
            h = (h + 1) & mask;
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

export function defHashMap<K, V>(
    pairs: Iterable<Pair<K, V>> | null,
    opts: HashMapOpts<K>
): HashMap<K, V>;
export function defHashMap<V>(
    obj: IObjectOf<V>,
    opts: HashMapOpts<string>
): HashMap<string, V>;
export function defHashMap<V>(
    src: any,
    opts: HashMapOpts<any>
): HashMap<any, V> {
    if (isPlainObject(src)) {
        const keys = Object.keys(src);
        return new HashMap<string, V>(
            map((k) => <Pair<string, V>>[k, (<IObjectOf<V>>src)[k]], keys),
            {
                cap: keys.length / (opts.load || DEFAULT_LOAD),
                ...opts,
            }
        );
    } else {
        return new HashMap(src, opts);
    }
}
