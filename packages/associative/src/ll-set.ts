// SPDX-License-Identifier: Apache-2.0
import type { Fn3, Maybe, Pair, Predicate2 } from "@thi.ng/api";
import { SEMAPHORE } from "@thi.ng/api/api";
import { DCons } from "@thi.ng/dcons/dcons";
import { equiv } from "@thi.ng/equiv";
import type { EquivSetOpts, IEquivSet } from "./api.js";
import { dissoc } from "./dissoc.js";
import { __equivSet } from "./internal/equiv.js";
import { __tostringMixin } from "./internal/tostring.js";
import { into } from "./into.js";

/**
 * Similar to {@link ArraySet}, this class is an alternative implementation of
 * the native ES6 Set API using a
 * [`DCons`](https://docs.thi.ng/umbrella/dcons/classes/DCons.html) linked list
 * as backing store and a customizable value equality / equivalence predicate.
 * By the default uses
 * [`equiv`](https://docs.thi.ng/umbrella/equiv/functions/equiv.html) for
 * equivalence checking.
 *
 * Additionally, the type also implements the
 * [`ICopy`](https://docs.thi.ng/umbrella/api/interfaces/ICopy.html),
 * [`IEmpty`](https://docs.thi.ng/umbrella/api/interfaces/IEmpty.html) and
 * [`IEquiv`](https://docs.thi.ng/umbrella/api/interfaces/IEquiv.html)
 * interfaces itself.
 */
@__tostringMixin
export class LLSet<T> extends Set<T> implements IEquivSet<T> {
	#vals: DCons<T>;
	#equiv: Predicate2<T>;

	constructor(
		vals?: Iterable<T> | null,
		opts: Partial<EquivSetOpts<T>> = {}
	) {
		super();
		this.#equiv = opts.equiv || equiv;
		this.#vals = new DCons<T>();
		vals && this.into(vals);
	}

	*[Symbol.iterator](): IterableIterator<T> {
		yield* this.#vals;
	}

	get [Symbol.species]() {
		return LLSet;
	}

	get [Symbol.toStringTag]() {
		return "LLSet";
	}

	get size(): number {
		return this.#vals.length;
	}

	copy() {
		const s = new LLSet<T>(null, this.opts());
		s.#vals = this.#vals.copy();
		return s;
	}

	empty() {
		return new LLSet<T>(null, this.opts());
	}

	clear() {
		this.#vals.clear();
	}

	first(): Maybe<T> {
		if (this.size) {
			return this.#vals.head!.value;
		}
	}

	add(key: T) {
		!this.has(key) && this.#vals.push(key);
		return this;
	}

	into(keys: Iterable<T>) {
		return <this>into(this, keys);
	}

	has(key: T) {
		return this.get(key, <any>SEMAPHORE) !== <any>SEMAPHORE;
	}

	/**
	 * Returns the canonical (stored) value for `key`, if present. If
	 * the set contains no equivalent for `key`, returns `notFound`.
	 *
	 * @param key - search key
	 * @param notFound - default value
	 */
	get(key: T, notFound?: T): Maybe<T> {
		const equiv = this.#equiv;
		const vals = this.#vals;
		let i = vals.head;
		while (i) {
			if (equiv(i.value, key)) {
				return i.value;
			}
			i = i.next;
		}
		return notFound;
	}

	delete(key: T) {
		const equiv = this.#equiv;
		const vals = this.#vals;
		let i = vals.head;
		while (i) {
			if (equiv(i.value, key)) {
				vals.splice(i, 1);
				return true;
			}
			i = i.next;
		}
		return false;
	}

	disj(keys: Iterable<T>) {
		return <this>dissoc(this, keys);
	}

	equiv(o: any) {
		return __equivSet(this, o);
	}

	/**
	 * The value args given to the callback `fn` MUST be treated as
	 * readonly/immutable. This could be enforced via TS, but would
	 * break ES6 Set interface contract.
	 *
	 * @param fn -
	 * @param thisArg -
	 */
	forEach(fn: Fn3<T, T, Set<T>, void>, thisArg?: any) {
		let i = this.#vals.head;
		while (i) {
			fn.call(thisArg, i.value, i.value, this);
			i = i.next;
		}
	}

	*entries(): IterableIterator<Pair<T, T>> {
		for (let v of this.#vals) {
			yield [v, v];
		}
	}

	*keys(): IterableIterator<T> {
		yield* this.#vals;
	}

	*values(): IterableIterator<T> {
		yield* this.#vals;
	}

	opts(): EquivSetOpts<T> {
		return { equiv: this.#equiv };
	}

	toString() {
		return `${this[Symbol.toStringTag]}(${this.size}) { }`;
	}
}

export const defLLSet = <T>(
	vals?: Iterable<T> | null,
	opts?: Partial<EquivSetOpts<T>>
) => new LLSet(vals, opts);
