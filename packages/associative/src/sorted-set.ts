import type { Fn3, ICompare, Pair } from "@thi.ng/api";
import { compare } from "@thi.ng/compare/compare";
import type { IReducible, ReductionFn } from "@thi.ng/transducers";
import { map } from "@thi.ng/transducers/map";
import type { IEquivSet, SortedSetOpts } from "./api.js";
import { dissoc } from "./dissoc.js";
import { __equivSet } from "./internal/equiv.js";
import { __inspectable } from "./internal/inspect.js";
import { into } from "./into.js";
import { SortedMap } from "./sorted-map.js";

const __private = new WeakMap<SortedSet<any>, SortedMap<any, any>>();

/**
 * Sorted set implementation with standard ES6 Set API, customizable value
 * equality and comparison semantics and additional functionality:
 *
 * - range queries (via {@link SortedSet.entries}, {@link SortedSet.keys},
 *   {@link SortedSet.values})
 * - multiple value addition/deletion via {@link SortedSet.into} and
 *   {@link SortedSet.disj}
 *
 * Furthermore, this class implements the
 * [`ICopy`](https://docs.thi.ng/umbrella/api/interfaces/ICopy.html), IEmpty`,
 * [`ICompare`](https://docs.thi.ng/umbrella/api/interfaces/ICompare.html) and
 * [`IEquiv`](https://docs.thi.ng/umbrella/api/interfaces/IEquiv.html)
 * interfaces defined by [`thi.ng/api`](https://thi.ng/api). The latter two
 * allow instances to be used as keys themselves in other data types defined in
 * this (and other) package(s).
 *
 * This set uses a {@link SortedMap} as backing store and therefore has the same
 * resizing characteristics.
 */
@__inspectable
export class SortedSet<T>
	extends Set<T>
	implements IEquivSet<T>, ICompare<Set<T>>, IReducible<any, T>
{
	/**
	 * Creates new instance with optional given values and/or
	 * implementation options. The options are the same as used by
	 * {@link SortedMap}.
	 *
	 * @param values - input values
	 * @param opts - config options
	 */
	constructor(values?: Iterable<T> | null, opts?: Partial<SortedSetOpts<T>>) {
		super();
		__private.set(
			this,
			new SortedMap<T, T>(
				values ? map((x) => <Pair<T, T>>[x, x], values) : null,
				opts
			)
		);
	}

	[Symbol.iterator](): IterableIterator<T> {
		return this.keys();
	}

	get [Symbol.species]() {
		return SortedSet;
	}

	get [Symbol.toStringTag]() {
		return "SortedSet";
	}

	get size(): number {
		return __private.get(this)!.size;
	}

	copy(): SortedSet<T> {
		return new SortedSet<T>(this.keys(), this.opts());
	}

	empty() {
		return new SortedSet<T>(null, this.opts());
	}

	compare(o: Set<T>) {
		const n = this.size;
		const m = o.size;
		if (n < m) return -1;
		if (n > m) return 1;
		const i = this.entries();
		const j = o.entries();
		let x: IteratorResult<Pair<T, T>>, y: IteratorResult<Pair<T, T>>;
		let c: number;
		while (((x = i.next()), (y = j.next()), !x.done && !y.done)) {
			if ((c = compare(x.value[0], y.value[0])) !== 0) {
				return c;
			}
		}
		return 0;
	}

	equiv(o: any) {
		return __equivSet(this, o);
	}

	$reduce(rfn: ReductionFn<any, T>, acc: any): any {
		return __private.get(this)!.$reduce((_acc, x) => rfn(_acc, x[0]), acc);
	}

	entries(key?: T, max = false): IterableIterator<Pair<T, T>> {
		return __private.get(this)!.entries(key, max);
	}

	keys(key?: T, max = false): IterableIterator<T> {
		return __private.get(this)!.keys(key, max);
	}

	values(key?: T, max = false): IterableIterator<T> {
		return __private.get(this)!.values(key, max);
	}

	add(key: T) {
		__private.get(this)!.set(key, key);
		return this;
	}

	into(keys: Iterable<T>) {
		return <this>into(this, keys);
	}

	clear(): void {
		__private.get(this)!.clear();
	}

	first(): T {
		const first = __private.get(this)!.first();
		return first ? first[0] : undefined;
	}

	delete(key: T): boolean {
		return __private.get(this)!.delete(key);
	}

	disj(keys: Iterable<T>) {
		return <this>dissoc(this, keys);
	}

	forEach(
		fn: Fn3<Readonly<T>, Readonly<T>, Set<T>, void>,
		thisArg?: any
	): void {
		for (let p of this) {
			fn.call(thisArg, p, p, this);
		}
	}

	has(key: T): boolean {
		return __private.get(this)!.has(key);
	}

	get(key: T, notFound?: T): T | undefined {
		return __private.get(this)!.get(key, notFound);
	}

	opts(): SortedSetOpts<T> {
		return __private.get(this)!.opts();
	}
}

export const defSortedSet = <T>(
	vals?: Iterable<T> | null,
	opts?: Partial<SortedSetOpts<T>>
) => new SortedSet(vals, opts);
