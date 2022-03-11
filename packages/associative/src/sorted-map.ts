import type { Comparator, Fn3, IObjectOf, Pair } from "@thi.ng/api";
import { SEMAPHORE } from "@thi.ng/api/api";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { compare } from "@thi.ng/compare/compare";
import type { ReductionFn } from "@thi.ng/transducers";
import { map } from "@thi.ng/transducers/map";
import { isReduced } from "@thi.ng/transducers/reduced";
import type { SortedMapOpts } from "./api.js";
import { dissoc } from "./dissoc.js";
import { __equivMap } from "./internal/equiv.js";
import { __inspectable } from "./internal/inspect.js";
import { into } from "./into.js";

interface SortedMapState<K, V> {
    head: Node<K, V>;
    cmp: Comparator<K>;
    maxh: number;
    h: number;
    length: number;
    cap: number;
    p: number;
}

class Node<K, V> {
    k: K | null;
    v: V | null;
    next: Node<K, V>[];

    constructor(k: K | null, v: V | null, h: number) {
        this.k = k;
        this.v = v;
        this.next = new Array(h + 1);
    }
}

// stores private properties for all instances
// http://fitzgeraldnick.com/2014/01/13/hiding-implementation-details-with-e6-weakmaps.html
const __private = new WeakMap<SortedMap<any, any>, SortedMapState<any, any>>();

@__inspectable
export class SortedMap<K, V> extends Map<K, V> {
    static DEFAULT_CAP = 8;
    static DEFAULT_P = 1 / Math.E;

    /**
     * Creates new {@link SortedMap} instance with optionally given pairs
     * and/or options.
     *
     * @param pairs - key-value pairs
     * @param opts - config options
     */
    constructor(
        pairs?: Iterable<Pair<K, V>> | null,
        opts: Partial<SortedMapOpts<K>> = {}
    ) {
        super();
        const cap = opts.capacity || SortedMap.DEFAULT_CAP;
        const maxh = Math.ceil(Math.log2(cap));
        __private.set(this, {
            head: new Node<K, V>(null, null, 0),
            cap: Math.pow(2, maxh),
            cmp: opts.compare || compare,
            p: opts.probability || SortedMap.DEFAULT_P,
            maxh,
            length: 0,
            h: 0,
        });
        if (pairs) {
            this.into(pairs);
        }
    }

    get [Symbol.species]() {
        return SortedMap;
    }

    *[Symbol.iterator](): IterableIterator<Pair<K, V>> {
        let node = __private.get(this)!.head;
        while ((node = node.next[0])) {
            yield [node.k, node.v];
        }
    }

    *entries(key?: K, max = false): IterableIterator<Pair<K, V>> {
        let { head: node, cmp } = __private.get(this)!;
        let code: number | undefined;
        if (max) {
            while ((node = node.next[0])) {
                if (key === undefined || (code = cmp(node.k, key)) <= 0) {
                    yield [node.k, node.v];
                    if (code === 0) return;
                }
            }
        } else {
            while ((node = node.next[0])) {
                if (key === undefined || (code = cmp(node.k, key)) >= 0) {
                    yield [node.k, node.v];
                }
            }
        }
    }

    keys(key?: K, max = false): IterableIterator<K> {
        return map((p) => p[0], this.entries(key, max));
    }

    values(key?: K, max = false): IterableIterator<V> {
        return map((p) => p[1], this.entries(key, max));
    }

    get size(): number {
        return __private.get(this)!.length;
    }

    clear() {
        const $this = __private.get(this)!;
        $this.head = new Node<K, V>(null, null, 0);
        $this.length = 0;
        $this.h = 0;
    }

    empty(): SortedMap<K, V> {
        return new SortedMap<K, V>(null, {
            ...this.opts(),
            capacity: SortedMap.DEFAULT_CAP,
        });
    }

    copy(): SortedMap<K, V> {
        return new SortedMap<K, V>(this, this.opts());
    }

    compare(o: Map<K, V>) {
        const n = this.size;
        const m = o.size;
        if (n < m) return -1;
        if (n > m) return 1;
        const i = this.entries();
        const j = o.entries();
        let x: IteratorResult<Pair<K, V>>, y: IteratorResult<Pair<K, V>>;
        let c: number;
        while (((x = i.next()), (y = j.next()), !x.done && !y.done)) {
            if (
                (c = compare(x.value[0], y.value[0])) !== 0 ||
                (c = compare(x.value[1], y.value[1])) !== 0
            ) {
                return c;
            }
        }
        return 0;
    }

    equiv(o: any) {
        return __equivMap(this, o);
    }

    first(): Pair<K, V> | undefined {
        const node = __private.get(this)!.head.next[0];
        return node ? [node.k, node.v] : undefined;
    }

    get(k: K, notFound?: V): V | undefined {
        const node = this.findPredNode(k).next[0];
        return node && __private.get(this)!.cmp(node.k, k) === 0
            ? node.v
            : notFound;
    }

    has(key: K) {
        return this.get(key, <any>SEMAPHORE) !== <any>SEMAPHORE;
    }

    set(k: K, v: V) {
        const $this = __private.get(this)!;
        let node = $this.head;
        let level = $this.h;
        let stack = new Array(level);
        const cmp = $this.cmp;
        let code: number | undefined;
        while (level >= 0) {
            while (
                node.next[level] &&
                (code = cmp(node.next[level].k, k)) < 0
            ) {
                node = node.next[level];
            }
            if (node.next[level] && code === 0) {
                do {
                    node.next[level].v = v;
                } while (level-- > 0);
                return this;
            }
            stack[level--] = node;
        }
        const h = this.pickHeight($this.maxh, $this.h, $this.p);
        node = new Node<K, V>(k, v, h);
        while ($this.h < h) {
            stack[++$this.h] = $this.head;
        }
        for (let i = 0; i <= h; i++) {
            node.next[i] = stack[i].next[i];
            stack[i].next[i] = node;
        }
        $this.length++;
        if ($this.length >= $this.cap) {
            $this.cap *= 2;
            $this.maxh++;
        }
        return this;
    }

    delete(k: K) {
        const $this = __private.get(this)!;
        let node: Node<K, V> = $this.head;
        let level = $this.h;
        let removed = false;
        const cmp = $this.cmp;
        let code: number | undefined;
        while (level >= 0) {
            while (
                node.next[level] &&
                (code = cmp(node.next[level].k, k)) < 0
            ) {
                node = node.next[level];
            }
            if (node.next[level] && code === 0) {
                removed = true;
                node.next[level] = node.next[level].next[level];
                if (node == $this.head && !node.next[level]) {
                    $this.h = Math.max(0, $this.h - 1);
                }
            }
            level--;
        }
        if (removed) $this.length--;
        return removed;
    }

    into(pairs: Iterable<Pair<K, V>>) {
        return <this>into(this, pairs);
    }

    dissoc(keys: Iterable<K>) {
        return <this>dissoc(this, keys);
    }

    /**
     * The key & value args given the callback `fn` MUST be treated as
     * readonly/immutable. This could be enforced via TS, but would
     * break ES6 Map interface contract.
     *
     * @param fn - 
     * @param thisArg - 
     */
    forEach(fn: Fn3<V, K, Map<K, V>, void>, thisArg?: any) {
        for (let p of this) {
            fn.call(thisArg, p[1], p[0], this);
        }
    }

    $reduce(rfn: ReductionFn<any, Pair<K, V>>, acc: any) {
        let node = __private.get(this)!.head;
        while ((node = node.next[0]) && !isReduced(acc)) {
            acc = rfn(acc, [node.k, node.v]);
        }
        return acc;
    }

    opts(): SortedMapOpts<K> {
        const $this = __private.get(this)!;
        return {
            capacity: $this.cap,
            compare: $this.cmp,
            probability: $this.p,
        };
    }

    protected findPredNode(k: K) {
        let { cmp, head: node, h: level } = __private.get(this)!;
        while (level >= 0) {
            while (node.next[level] && cmp(node.next[level].k, k) < 0) {
                node = node.next[level];
            }
            level--;
        }
        return node;
    }

    protected pickHeight(maxh: number, h: number, p: number) {
        const max = Math.min(maxh, h + 1);
        let level = 0;
        while (Math.random() < p && level < max) {
            level++;
        }
        return level;
    }
}

export function defSortedMap<K, V>(
    pairs?: Iterable<Pair<K, V>> | null,
    opts?: Partial<SortedMapOpts<K>>
): SortedMap<K, V>;
export function defSortedMap<V>(
    obj: IObjectOf<V>,
    opts?: Partial<SortedMapOpts<string>>
): SortedMap<string, V>;
export function defSortedMap<V>(
    src: any,
    opts?: Partial<SortedMapOpts<any>>
): SortedMap<any, V> {
    if (isPlainObject(src)) {
        const keys = Object.keys(src);
        return new SortedMap<string, V>(
            map((k) => <Pair<string, V>>[k, (<IObjectOf<V>>src)[k]], keys),
            {
                capacity: keys.length,
                ...opts,
            }
        );
    } else {
        return new SortedMap(src, opts);
    }
}
