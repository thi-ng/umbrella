// SPDX-License-Identifier: Apache-2.0
import type { Fn3, ICompare, Maybe, Pair } from "@thi.ng/api";
import type { IEquivSet } from "@thi.ng/associative";
import { dissoc } from "@thi.ng/associative/dissoc";
import { __equivSet } from "@thi.ng/associative/internal/equiv";
import { __tostringMixin } from "@thi.ng/associative/internal/tostring";
import { into } from "@thi.ng/associative/into";
import { compare } from "@thi.ng/compare/compare";
import type { IReducible, Reduced, ReductionFn } from "@thi.ng/transducers";
import { map } from "@thi.ng/transducers/map";
import type { SortedSetOpts } from "./api.js";
import { SortedMap } from "./sorted-map.js";

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
 * [`ICopy`](https://docs.thi.ng/umbrella/api/interfaces/ICopy.html),
 * [`ICompare`](https://docs.thi.ng/umbrella/api/interfaces/ICompare.html),
 * [`IEmpty`](https://docs.thi.ng/umbrella/api/interfaces/IEmpty.html) and
 * [`IEquiv`](https://docs.thi.ng/umbrella/api/interfaces/IEquiv.html)
 * interfaces defined by [`thi.ng/api`](https://thi.ng/api). The latter two
 * allow instances to be used as keys themselves in other data types defined in
 * this (and other) package(s).
 *
 * This set uses a {@link SortedMap} as backing store and therefore has the same
 * resizing characteristics.
 */
@__tostringMixin
export class SortedSet<T>
	extends Set<T>
	implements IEquivSet<T>, ICompare<Set<T>>, IReducible<T, any>
{
	#map: SortedMap<T, T>;

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
		this.#map = new SortedMap<T, T>(
			values ? map((x) => <Pair<T, T>>[x, x], values) : null,
			opts
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
		return this.#map.size;
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

	$reduce<R>(rfn: ReductionFn<T, any>, acc: R | Reduced<R>) {
		return this.#map.$reduce((_acc, x) => rfn(_acc, x[0]), acc);
	}

	entries(key?: T, max = false): IterableIterator<Pair<T, T>> {
		return this.#map.entries(key, max);
	}

	keys(key?: T, max = false): IterableIterator<T> {
		return this.#map.keys(key, max);
	}

	values(key?: T, max = false): IterableIterator<T> {
		return this.#map.values(key, max);
	}

	add(key: T) {
		this.#map.set(key, key);
		return this;
	}

	into(keys: Iterable<T>) {
		return <this>into(this, keys);
	}

	clear(): void {
		this.#map.clear();
	}

	first(): Maybe<T> {
		const first = this.#map.first();
		return first ? first[0] : undefined;
	}

	delete(key: T): boolean {
		return this.#map.delete(key);
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
		return this.#map.has(key);
	}

	get(key: T, notFound?: T): Maybe<T> {
		return this.#map.get(key, notFound);
	}

	opts(): SortedSetOpts<T> {
		return this.#map.opts();
	}
}

export const defSortedSet = <T>(
	vals?: Iterable<T> | null,
	opts?: Partial<SortedSetOpts<T>>
) => new SortedSet(vals, opts);
