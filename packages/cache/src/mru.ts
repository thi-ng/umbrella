import { ConsCell } from "@thi.ng/dcons";

import { CacheEntry, CacheOpts } from "./api";
import { LRUCache } from "./lru";

export class MRUCache<K, V> extends LRUCache<K, V> {

    constructor(pairs?: Iterable<[K, V]>, opts?: Partial<CacheOpts<K, V>>) {
        super(pairs, opts);
    }

    empty(): MRUCache<K, V> {
        return new MRUCache<K, V>(null, this.opts);
    }

    set(key: K, value: V) {
        const size = this.opts.ksize(key) + this.opts.vsize(value);
        const e = this.map.get(key);
        if (e) {
            this._size -= e.value.s;
        }
        this._size += size;
        if (this.ensureSize()) {
            if (e) {
                e.value.v = value;
                e.value.s = size;
                this.items.asHead(e);
            } else {
                this.items.cons({
                    k: key,
                    v: value,
                    s: size,
                });
                this.map.set(key, this.items.head);
            }
        }
        return value;
    }

    protected resetEntry(e: ConsCell<CacheEntry<K, V>>) {
        this.items.asHead(e);
        return e.value.v;
    }
}
