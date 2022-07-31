import type { Fn3, Pair, Predicate2 } from "@thi.ng/api";
import { SEMAPHORE } from "@thi.ng/api/api";
import { DCons } from "@thi.ng/dcons/dcons";
import { equiv } from "@thi.ng/equiv";
import type { EquivSetOpts, IEquivSet } from "./api.js";
import { dissoc } from "./dissoc.js";
import { __equivSet } from "./internal/equiv.js";
import { __inspectable } from "./internal/inspect.js";
import { into } from "./into.js";

interface SetProps<T> {
	vals: DCons<T>;
	equiv: Predicate2<T>;
}

const __private = new WeakMap<LLSet<any>, SetProps<any>>();

const __vals = (inst: LLSet<any>) => __private.get(inst)!.vals;

/**
 * Similar to {@link ArraySet}, this class is an alternative
 * implementation of the native ES6 Set API using a
 * {@link @thi.ng/dcons#DCons} linked list as backing store and a
 * customizable value equality / equivalence predicate. By the default
 * uses {@link @thi.ng/equiv#equiv} for equivalence checking.
 *
 * Additionally, the type also implements the {@link @thi.ng/api#ICopy},
 * {@link @thi.ng/api#IEmpty} and {@link @thi.ng/api#IEquiv} interfaces
 * itself.
 */
@__inspectable
export class LLSet<T> extends Set<T> implements IEquivSet<T> {
	constructor(
		vals?: Iterable<T> | null,
		opts: Partial<EquivSetOpts<T>> = {}
	) {
		super();
		__private.set(this, {
			equiv: opts.equiv || equiv,
			vals: new DCons<T>(),
		});
		vals && this.into(vals);
	}

	*[Symbol.iterator](): IterableIterator<T> {
		yield* __vals(this);
	}

	get [Symbol.species]() {
		return LLSet;
	}

	get [Symbol.toStringTag]() {
		return "LLSet";
	}

	get size(): number {
		return __vals(this).length;
	}

	copy() {
		const s = new LLSet<T>(null, this.opts());
		__private.get(s)!.vals = __vals(this).copy();
		return s;
	}

	empty() {
		return new LLSet<T>(null, this.opts());
	}

	clear() {
		__vals(this).clear();
	}

	first(): T | undefined {
		if (this.size) {
			return __vals(this).head!.value;
		}
	}

	add(key: T) {
		!this.has(key) && __vals(this).push(key);
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
	get(key: T, notFound?: T): T | undefined {
		const { equiv, vals } = __private.get(this)!;
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
		const { equiv, vals } = __private.get(this)!;
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
		let i = __vals(this).head;
		while (i) {
			fn.call(thisArg, i.value, i.value, this);
			i = i.next;
		}
	}

	*entries(): IterableIterator<Pair<T, T>> {
		for (let v of __vals(this)) {
			yield [v, v];
		}
	}

	*keys(): IterableIterator<T> {
		yield* __vals(this);
	}

	*values(): IterableIterator<T> {
		yield* __vals(this);
	}

	opts(): EquivSetOpts<T> {
		return { equiv: __private.get(this)!.equiv };
	}
}

export const defLLSet = <T>(
	vals?: Iterable<T> | null,
	opts?: Partial<EquivSetOpts<T>>
) => new LLSet(vals, opts);
