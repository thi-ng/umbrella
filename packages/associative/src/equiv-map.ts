import { ICopy, IEmpty, IEquiv, IObjectOf, Predicate2 } from "@thi.ng/api/api";
import { equiv } from "@thi.ng/api/equiv";

import { SEMAPHORE } from "./api";
import { EquivSet } from "./equiv-set";

export class EquivMap<K, V> extends Map<K, V> implements
    Iterable<[K, V]>,
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

    protected _keys: EquivSet<K>;
    protected _map: Map<K, V>;

    constructor(pairs?: Iterable<[K, V]>, eq: Predicate2<K> = equiv) {
        super();
        this._keys = new EquivSet<K>(null, eq);
        this._map = new Map<K, V>();
        Object.defineProperties(this, {
            _keys: { enumerable: false },
            _map: { enumerable: false }
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
        return this._keys.size;
    }

    clear() {
        this._keys.clear();
        this._map.clear();
    }

    empty() {
        return new EquivMap<K, V>(null, (<any>this._keys)._equiv);
    }

    copy() {
        const m = new EquivMap<K, V>(null, (<any>this._keys)._equiv);
        m._keys = this._keys.copy();
        m._map = new Map<K, V>(this._map);
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
        for (let k of this._map.keys()) {
            if (!equiv(o.get(k), this._map.get(k))) {
                return false;
            }
        }
        return true;
    }

    delete(key: K) {
        key = this._keys.get(key, SEMAPHORE);
        if (key !== <any>SEMAPHORE) {
            this._map.delete(key);
            this._keys.delete(key);
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
        for (let pair of this._map) {
            fn.call(thisArg, pair[1], pair[0], this);
        }
    }

    get(key: K, notFound?: any) {
        key = this._keys.get(key, SEMAPHORE);
        if (key !== <any>SEMAPHORE) {
            return this._map.get(key);
        }
        return notFound;
    }

    has(key: K) {
        return this._keys.has(key);
    }

    set(key: K, value: V) {
        const k = this._keys.get(key, SEMAPHORE);
        if (k !== <any>SEMAPHORE) {
            this._map.set(k, value);
        } else {
            this._keys.add(key);
            this._map.set(key, value);
        }
        return this;
    }

    into(pairs: Iterable<[K, V]>) {
        for (let p of pairs) {
            this.set(p[0], p[1]);
        }
        return this;
    }

    entries() {
        return this._map.entries();
    }

    keys() {
        return this._keys.keys();
    }

    values() {
        return this._map.values();
    }
}