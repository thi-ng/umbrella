import type { Fn0 } from "@thi.ng/api";
import type { ConsCell } from "@thi.ng/dcons";
import { DCons } from "@thi.ng/dcons/dcons";
import { map } from "@thi.ng/transducers/map";
import type { CacheEntry, CacheOpts, ICache } from "./api.js";

export class LRUCache<K, V> implements ICache<K, V> {
	protected map: Map<K, ConsCell<CacheEntry<K, V>>>;
	protected items: DCons<CacheEntry<K, V>>;
	protected opts: CacheOpts<K, V>;
	protected _size: number;

	constructor(
		pairs?: Iterable<[K, V]> | null,
		opts?: Partial<CacheOpts<K, V>>
	) {
		const _opts = <CacheOpts<K, V>>Object.assign(
			{
				maxlen: Infinity,
				maxsize: Infinity,
				map: () => new Map<K, any>(),
				ksize: () => 0,
				vsize: () => 0,
			},
			opts
		);
		this.map = _opts.map();
		this.items = new DCons<CacheEntry<K, V>>();
		this._size = 0;
		this.opts = _opts;
		if (pairs) {
			this.into(pairs);
		}
	}

	get length() {
		return this.items.length;
	}

	get size() {
		return this._size;
	}

	[Symbol.iterator]() {
		return this.entries();
	}

	entries(): IterableIterator<Readonly<[K, CacheEntry<K, V>]>> {
		return map((e) => <[K, CacheEntry<K, V>]>[e.k, e], this.items);
	}

	keys(): IterableIterator<Readonly<K>> {
		return map((e) => e.k, this.items);
	}

	values(): IterableIterator<Readonly<V>> {
		return map((e) => e.v, this.items);
	}

	copy(): ICache<K, V> {
		const c = this.empty();
		c.items = this.items.copy();
		let cell = c.items.head;
		while (cell) {
			c.map.set(cell.value.k, cell);
			cell = cell.next;
		}
		return c;
	}

	empty(): LRUCache<K, V> {
		return new LRUCache<K, V>(null, this.opts);
	}

	release() {
		this._size = 0;
		this.map.clear();
		const release = this.opts.release;
		if (release) {
			let e;
			while ((e = this.items.drop())) {
				release(e.k, e.v);
			}
			return true;
		}
		return this.items.release();
	}

	has(key: K): boolean {
		return this.map.has(key);
	}

	get(key: K, notFound?: any) {
		const e = this.map.get(key);
		if (e) {
			return this.resetEntry(e);
		}
		return notFound;
	}

	set(key: K, value: V) {
		const size = this.opts.ksize(key) + this.opts.vsize(value);
		const e = this.map.get(key);
		const additionalSize = Math.max(0, size - (e ? e.value.s : 0));
		this._size += additionalSize;
		if (this.ensureSize()) {
			this.doSetEntry(e, key, value, size);
		} else {
			this._size -= additionalSize;
		}
		return value;
	}

	into(pairs: Iterable<[K, V]>) {
		for (let p of pairs) {
			this.set(p[0], p[1]);
		}
		return this;
	}

	getSet(key: K, retrieve: Fn0<Promise<V>>): Promise<V> {
		const e = this.map.get(key);
		if (e) {
			return Promise.resolve(this.resetEntry(e));
		}
		return retrieve().then((v) => this.set(key, v));
	}

	delete(key: K): boolean {
		const e = this.map.get(key);
		if (e) {
			this.removeEntry(e);
			return true;
		}
		return false;
	}

	protected resetEntry(e: ConsCell<CacheEntry<K, V>>) {
		this.items.asTail(e);
		return e.value.v;
	}

	protected ensureSize() {
		const release = this.opts.release;
		const maxs = this.opts.maxsize;
		const maxl = this.opts.maxlen;
		while (this._size > maxs || this.length >= maxl) {
			const e = this.items.drop();
			if (!e) {
				return false;
			}
			this.map.delete(e.k);
			release && release(e.k, e.v);
			this._size -= e.s;
		}
		return true;
	}

	protected removeEntry(e: ConsCell<CacheEntry<K, V>>) {
		const ee = e.value;
		this.map.delete(ee.k);
		this.items.remove(e);
		this.opts.release && this.opts.release(ee.k, ee.v);
		this._size -= ee.s;
	}

	protected doSetEntry(
		e: ConsCell<CacheEntry<K, V>> | undefined,
		k: K,
		v: V,
		s: number
	) {
		if (e) {
			e.value.v = v;
			e.value.s = s;
			this.items.asTail(e);
		} else {
			this.items.push({ k, v, s });
			this.map.set(k, this.items.tail!);
		}
	}
}
