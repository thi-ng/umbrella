import type { ConsCell } from "@thi.ng/dcons";
import type { CacheEntry } from "./api.js";
import { LRUCache } from "./lru.js";

export class MRUCache<K, V> extends LRUCache<K, V> {
	empty(): MRUCache<K, V> {
		return new MRUCache<K, V>(null, this.opts);
	}

	protected resetEntry(e: ConsCell<CacheEntry<K, V>>) {
		this.items.asHead(e);
		return e.value.v;
	}

	protected doSetEntry(
		e: ConsCell<CacheEntry<K, V>> | undefined,
		k: K,
		v: V,
		s: number
	) {
		if (e) {
			this.opts.update?.(k, e.value.v, v);
			e.value.v = v;
			e.value.s = s;
			this.items.asHead(e);
		} else {
			this.items.prepend({ k, v, s });
			this.map.set(k, this.items.head!);
		}
	}
}
