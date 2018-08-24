import {
    Comparator,
    ICompare,
    ICopy,
    IEmpty,
    IEquiv,
    IObjectOf,
    Pair,
    Predicate2,
    SEMAPHORE
} from "@thi.ng/api/api";
import { isArray } from "@thi.ng/checks/is-array";
import { compare } from "@thi.ng/compare";
import { equiv } from "@thi.ng/equiv";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { IReducible, ReductionFn } from "@thi.ng/transducers/api";
import { isReduced } from "@thi.ng/transducers/reduced";
import { map } from "@thi.ng/transducers/xform/map";

import { SortedMapOpts } from "./api";

// stores private properties for all instances
// http://fitzgeraldnick.com/2014/01/13/hiding-implementation-details-with-e6-weakmaps.html
const __private = new WeakMap<SortedMap<any, any>, SortedMapProps>();

interface SortedMapProps {
    head: any[];
    tail: any[];
    update: any[];
    nil: any[];
    equiv: Predicate2<any>;
    cmp: Comparator<any>;
    level: number;
    maxLevel: number;
    p: number;
    cap: number;
    length: number;
}

const KEY = 0;
const VAL = 1;
const PREV = 2;
const NEXT = 3;

const makeNode = (level: number, key?, value?) => {
    const node = new Array(4 + level);
    node[KEY] = key;
    node[VAL] = value;
    return node;
}

/**
 * This class is an alternative implementation of the ES6 Map API using
 * a Skip list as backing store and supports configurable key equality
 * and sorting semantics.
 *
 * William Pugh (creator of this data structure) description:
 *
 * "Skip lists are probabilistic data structures that have the same
 * asymptotic expected time bounds as balanced trees, are simpler,
 * faster and use less space."
 *
 * Adapted & refactored from Python version:
 * - http://pythonsweetness.tumblr.com/post/45227295342/fast-pypy-compatible-ordered-map-in-89-lines-of
 *
 * Data structure description:
 * - ftp://ftp.cs.umd.edu/pub/skipLists/skiplists.pdf
 * - https://en.wikipedia.org/wiki/Skip_list
 */
export class SortedMap<K, V> extends Map<K, V> implements
    ICopy<SortedMap<K, V>>,
    ICompare<Map<K, V>>,
    IEmpty<SortedMap<K, V>>,
    IEquiv,
    IReducible<any, Pair<K, V>> {

    static fromObject<T>(obj: IObjectOf<T>): SortedMap<PropertyKey, T> {
        const m = new SortedMap<PropertyKey, T>(null, { capacity: Object.keys(obj).length });
        for (let k in obj) {
            m.set(k, obj[k]);
        }
        return m;
    }

    static readonly DEFAULT_CAP = 16;
    static readonly DEFAULT_P = 1 / Math.E;

    /**
     * Creates new instance with optional given key-value pairs and/or
     * implementation options.
     *
     * @param values
     * @param opts
     */
    constructor(values?: Iterable<Pair<K, V>>, opts: Partial<SortedMapOpts<K>> = {}) {
        super();
        values = this.init(values, opts);
        if (values) {
            this.into(values);
        }
    }

    get [Symbol.species]() {
        return SortedMap;
    }

    [Symbol.iterator]() {
        return this.entries();
    }

    get size() {
        return __private.get(this).length;
    }

    clear() {
        this.init(null, { ...this.opts(), capacity: SortedMap.DEFAULT_CAP });
    }

    empty(): SortedMap<K, V> {
        return new SortedMap<K, V>(null, { ...this.opts(), capacity: SortedMap.DEFAULT_CAP });
    }

    copy(): SortedMap<K, V> {
        return new SortedMap<K, V>(this, this.opts());
    }

    compare(o: Map<K, V>) {
        const n = this.size, m = o.size;
        if (n < m) return -1;
        if (n > m) return 1;
        const i = this.entries();
        const j = o.entries();
        let x: IteratorResult<Pair<K, V>>, y: IteratorResult<Pair<K, V>>;
        let c: number;
        while ((x = i.next(), y = j.next(), !x.done && !y.done)) {
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
        const node = __private.get(this).head[NEXT];
        if (node[KEY] !== undefined) {
            return [node[KEY], node[VAL]];
        }
    }

    forEach(fn: (val: V, key: K, map: Map<K, V>) => void, thisArg?: any) {
        for (let p of this) {
            fn.call(thisArg, p[1], p[0], this);
        }
    }

    set(key: K, value: V) {
        let $this = __private.get(this);
        const update = $this.update.slice();
        let node = this.findLessAndUpdate(update, key);
        let prev = node;
        node = node[NEXT];
        if ($this.equiv(node[KEY], key))
            node[VAL] = value;
        else {
            if ($this.length >= $this.cap) {
                this.grow();
                $this = __private.get(this);
                prev = this.findLessAndUpdate(update, key);
            }
            const newLevel = this.randomLevel();
            $this.level = Math.max($this.level, newLevel);
            node = makeNode(newLevel, key, value);
            node[PREV] = prev;
            for (let i = 0; i <= newLevel; i++) {
                const j = i + NEXT;
                node[j] = update[i][j];
                update[i][j] = node;
            }
            if (node[NEXT] === $this.nil) {
                $this.tail = node;
            } else {
                node[NEXT][PREV] = node;
            }
            $this.length++;
        }
        return this;
    }

    delete(key: K) {
        const $this = __private.get(this);
        const update = $this.update.slice();
        let node = this.findLessAndUpdate(update, key)[NEXT];
        if ($this.equiv(node[KEY], key)) {
            node[NEXT][PREV] = update[0];
            for (let i = 0; i <= $this.level; i++) {
                const j = i + NEXT;
                if (update[i][j] !== node) {
                    break;
                }
                update[i][j] = node[j];
            }
            while ($this.level > 0 && $this.head[$this.level + NEXT][KEY] === undefined) {
                $this.level--;
            }
            if ($this.tail === node) {
                $this.tail = node[PREV];
            }
            $this.length--;
            return true;
        }
        return false;
    }

    dissoc(...keys: K[]) {
        for (let k of keys) {
            this.delete(k);
        }
        return this;
    }

    has(key: K) {
        return this.get(key, SEMAPHORE) !== SEMAPHORE;
    }

    get(key: K, notFound?: any) {
        const $this = __private.get(this);
        const node = this.findLess(key)[NEXT];
        return $this.equiv(node[KEY], key) ?
            node[VAL] :
            notFound;
    }

    into(pairs: Iterable<Pair<K, V>>) {
        for (let p of pairs) {
            this.set(p[0], p[1]);
        }
        return this;
    }

    $reduce(rfn: ReductionFn<any, Pair<K, V>>, acc: any) {
        const $this = __private.get(this);
        let node = $this.head[NEXT];
        while (node[KEY] !== undefined && !isReduced(acc)) {
            acc = rfn(acc, [node[KEY], node[VAL]]);
            node = node[NEXT];
        }
        return acc;
    }

    *entries(key?: K, reverse = false): IterableIterator<Pair<K, V>> {
        const $this = __private.get(this);
        const step = reverse ? PREV : NEXT;
        let node = reverse ? $this.tail : $this.head[NEXT];
        if (key !== undefined) {
            const found = this.findLess(key);
            // the original python impl doesn't handle unknown and out-of-range keys properly
            node = !reverse || (found[NEXT] != $this.nil && $this.equiv(found[NEXT][KEY], key)) ?
                found[NEXT] :
                found;
        }
        while (node[KEY] !== undefined) {
            yield [node[KEY], node[VAL]];
            node = node[step];
        }
    }

    keys(key?: K, reverse = false): IterableIterator<K> {
        return map((p) => p[0], this.entries(key, reverse));
    }

    values(key?: K, reverse = false): IterableIterator<V> {
        return map((p) => p[1], this.entries(key, reverse));
    }

    protected init(values: Iterable<Pair<K, V>>, opts: Partial<SortedMapOpts<K>>) {
        let cap;
        if (values && !opts.capacity) {
            values = isArray(values) ? values : [...values];
            cap = Math.max((<any>values).length, SortedMap.DEFAULT_CAP);
        }
        else {
            cap = opts.capacity || SortedMap.DEFAULT_CAP;
        }
        cap < 1 && illegalArgs(`invalid capacity: ${cap}`);
        const maxLevel = Math.ceil(Math.log2(cap));
        const nil = makeNode(-1);
        const head = makeNode(maxLevel).fill(nil, 3);
        const update = new Array(maxLevel + 1).fill(head);
        __private.set(this, {
            head,
            update,
            nil,
            tail: nil,
            equiv: opts.equiv || equiv,
            cmp: opts.compare || compare,
            level: 0,
            maxLevel,
            p: opts.probability || SortedMap.DEFAULT_P,
            cap: Math.pow(2, maxLevel),
            length: 0
        });
        return values;
    }

    opts(growFactor = 1): SortedMapOpts<K> {
        const $this = __private.get(this);
        return {
            capacity: $this.cap * growFactor,
            equiv: $this.equiv,
            compare: $this.cmp,
            probability: $this.p,
        };
    }

    /**
     * Recreates map with double capacity.
     */
    protected grow() {
        const tmp = new SortedMap(
            this.entries(),
            this.opts(2));
        __private.set(this, __private.get(tmp));
        __private.delete(tmp);
    }

    protected randomLevel() {
        const $this = __private.get(this);
        const max = Math.min($this.maxLevel, $this.level + 1);
        const p = $this.p;
        let level = 0;
        while (Math.random() < p && level < max) {
            level++;
        }
        return level;
    }

    protected findLess(key: K) {
        const $this = __private.get(this);
        const cmp = $this.cmp;
        let node = $this.head;
        for (let i = $this.level; i >= 0; i--) {
            const j = i + NEXT;
            let k = node[j][KEY];
            while (k !== undefined && cmp(k, key) < 0) {
                node = node[j];
                k = node[j][KEY];
            }
        }
        return node;
    }

    /**
     * Like `findLess`, but records path in `update` array
     *
     * @param update
     * @param key
     */
    protected findLessAndUpdate(update, key: K) {
        const $this = __private.get(this);
        const cmp = $this.cmp;
        let node = $this.head;
        for (let i = $this.level; i >= 0; i--) {
            const j = i + NEXT;
            let k = node[j][KEY];
            while (k !== undefined && cmp(k, key) < 0) {
                node = node[j];
                k = node[j][KEY];
            }
            update[i] = node;
        }
        return node;
    }
}
