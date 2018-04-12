import { ICopy, IEmpty, IEquiv, IObjectOf, Predicate2 } from "@thi.ng/api/api";
import { equiv } from "@thi.ng/api/equiv";

import { SEMAPHORE, Pair } from "./api";
import { EquivSet } from "./equiv-set";

interface EqMapProps<K, V> {
    keys: EquivSet<K>;
    map: Map<K, V>;
}

export interface EqMapOpts<K> {
    equiv: Predicate2<K>;
}

const __private = new WeakMap<EquivMap<any, any>, EqMapProps<any, any>>();

export class EquivMap<K, V> extends Map<K, V> implements
    Iterable<Pair<K, V>>,
    ICopy<EquivMap<K, V>>,
    IEmpty<EquivMap<K, V>>,
    IEquiv {

    static fromObject<T>(obj: IObjectOf<T>): EquivMap<PropertyKey, T> {
        const m = new EquivMap<PropertyKey, T>();
        for (let k in obj) {
            if (obj.hasOwnProperty(k)) {
                m.set(k, obj[k]);
            }
        }
        return m;
    }

    constructor(pairs?: Iterable<Pair<K, V>>, eq: Predicate2<K> = equiv) {
        super();
        __private.set(this, {
            keys: new EquivSet<K>(null, eq),
            map: new Map<K, V>(),
        });
        if (pairs) {
            this.into(pairs);
        }
    }

    [Symbol.iterator]() {
        return this.entries();
    }

    get [Symbol.species]() {
        return EquivMap;
    }

    get size() {
        return __private.get(this).keys.size;
    }

    clear() {
        const $this = __private.get(this);
        $this.keys.clear();
        $this.map.clear();
    }

    empty() {
        return new EquivMap<K, V>(null, __private.get(this).keys.getOpts().equiv);
    }

    copy() {
        const $this = __private.get(this);
        const m = new EquivMap<K, V>();
        __private.set(m, {
            keys: $this.keys.copy(),
            map: new Map<K, V>($this.map)
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
        for (let k of __private.get(this).map.keys()) {
            if (!equiv(o.get(k), __private.get(this).map.get(k))) {
                return false;
            }
        }
        return true;
    }

    delete(key: K) {
        const $this = __private.get(this);
        key = $this.keys.get(key, SEMAPHORE);
        if (key !== <any>SEMAPHORE) {
            $this.map.delete(key);
            $this.keys.delete(key);
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

    forEach(fn: (val: V, key: K, map: Map<K, V>) => void, thisArg?: any) {
        for (let pair of __private.get(this).map) {
            fn.call(thisArg, pair[1], pair[0], this);
        }
    }

    get(key: K, notFound?: any) {
        const $this = __private.get(this);
        key = $this.keys.get(key, SEMAPHORE);
        if (key !== <any>SEMAPHORE) {
            return $this.map.get(key);
        }
        return notFound;
    }

    has(key: K) {
        return __private.get(this).keys.has(key);
    }

    set(key: K, value: V) {
        const $this = __private.get(this);
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
        for (let p of pairs) {
            this.set(p[0], p[1]);
        }
        return this;
    }

    entries() {
        return __private.get(this).map.entries();
    }

    keys() {
        return __private.get(this).map.keys();
    }

    values() {
        return __private.get(this).map.values();
    }

    getOpts(): EqMapOpts<K> {
        return __private.get(this).keys.getOpts();
    }
}