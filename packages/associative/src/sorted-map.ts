import {
    Comparator,
    Fn3,
    IObjectOf,
    Pair,
    SEMAPHORE
} from "@thi.ng/api";
import { compare } from "@thi.ng/compare";
import { equiv } from "@thi.ng/equiv";
import { isReduced, map, ReductionFn } from "@thi.ng/transducers";
import { SortedMapOpts } from "./api";

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
    k: K;
    v: V;
    next: Node<K, V>[];

    constructor(k: K, v: V, h: number) {
        this.k = k;
        this.v = v;
        this.next = new Array(h + 1);
    }
}

// stores private properties for all instances
// http://fitzgeraldnick.com/2014/01/13/hiding-implementation-details-with-e6-weakmaps.html
const __private = new WeakMap<SortedMap<any, any>, SortedMapState<any, any>>();

export class SortedMap<K, V> extends Map<K, V> {
    /**
     * Creates new `SortedMap` instance from given object's key-value
     * pairs.
     *
     * @param obj
     * @param opts
     */
    static fromObject<T>(
        obj: IObjectOf<T>,
        opts?: Partial<SortedMapOpts<PropertyKey>>
    ): SortedMap<PropertyKey, T> {
        const m = new SortedMap<PropertyKey, T>(null, {
            capacity: Object.keys(obj).length,
            ...opts
        });
        for (let k in obj) {
            obj.hasOwnProperty(k) && m.set(k, obj[k]);
        }
        return m;
    }

    static DEFAULT_CAP = 8;
    static DEFAULT_P = 1 / Math.E;

    /**
     * Creates new `SortedMap` instance with optionally given pairs
     * and/or options.
     *
     * @param pairs
     * @param opts
     */
    constructor(
        pairs?: Iterable<Pair<K, V>>,
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
            h: 0
        });
        if (pairs) {
            this.into(pairs);
        }
    }

    get [Symbol.species]() {
        return SortedMap;
    }

    *[Symbol.iterator](): IterableIterator<Pair<K, V>> {
        let node = __private.get(this).head;
        while ((node = node.next[0])) {
            yield [node.k, node.v];
        }
    }

    *entries(key?: K, max = false): IterableIterator<Pair<K, V>> {
        const $this = __private.get(this);
        let node = $this.head;
        const cmp = $this.cmp;
        let code: number;
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

    get size() {
        return __private.get(this).length;
    }

    clear() {
        const $this = __private.get(this);
        $this.head = new Node<K, V>(null, null, 0);
        $this.length = 0;
        $this.h = 0;
    }

    empty(): SortedMap<K, V> {
        return new SortedMap<K, V>(null, {
            ...this.opts(),
            capacity: SortedMap.DEFAULT_CAP
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
            if ((c = compare(x.value[0], y.value[0])) !== 0) {
                return c;
            }
            if ((c = compare(x.value[1], y.value[1])) !== 0) {
                return c;
            }
        }
        return 0;
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
        for (let p of this.entries()) {
            if (!equiv(o.get(p[0]), p[1])) {
                return false;
            }
        }
        return true;
    }

    first(): Pair<K, V> {
        const node = __private.get(this).head.next[0];
        return node ? [node.k, node.v] : undefined;
    }

    get(k: K, notFound?: V) {
        const node = this.findPredNode(k).next[0];
        return node && __private.get(this).cmp(node.k, k) === 0
            ? node.v
            : notFound;
    }

    has(key: K) {
        return this.get(key, <any>SEMAPHORE) !== <any>SEMAPHORE;
    }

    set(k: K, v: V) {
        const $this = __private.get(this);
        let node = $this.head;
        let level = $this.h;
        let stack = new Array(level);
        const cmp = $this.cmp;
        let code: number;
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
                } while (--level >= 0);
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
        const $this = __private.get(this);
        let node: Node<K, V> = $this.head;
        let level = $this.h;
        let removed = false;
        const cmp = $this.cmp;
        let code: number;
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

    forEach(fn: Fn3<V, Readonly<K>, Map<K, V>, void>, thisArg?: any) {
        for (let p of this) {
            fn.call(thisArg, p[1], p[0], this);
        }
    }

    $reduce(rfn: ReductionFn<any, Pair<K, V>>, acc: any) {
        let node = __private.get(this).head;
        while ((node = node.next[0]) && !isReduced(acc)) {
            acc = rfn(acc, [node.k, node.v]);
        }
        return acc;
    }

    opts(): SortedMapOpts<K> {
        const $this = __private.get(this);
        return {
            capacity: $this.cap,
            compare: $this.cmp,
            probability: $this.p
        };
    }

    protected findPredNode(k: K) {
        const $this = __private.get(this);
        const cmp = $this.cmp;
        let node = $this.head;
        let level = $this.h;
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
