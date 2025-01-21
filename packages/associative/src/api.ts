// SPDX-License-Identifier: Apache-2.0
import type {
	Fn,
	IClear,
	ICopy,
	IEmpty,
	IEquiv,
	IGet,
	IInto,
	Maybe,
	Predicate2,
} from "@thi.ng/api";

export interface IEquivSet<T>
	extends Set<T>,
		IClear,
		ICopy<IEquivSet<T>>,
		IEmpty<IEquivSet<T>>,
		IEquiv,
		IGet<T, T>,
		IInto<T, IEquivSet<T>> {
	disj(values: Iterable<T>): this;
	first(): Maybe<T>;
}

export interface EquivSetConstructor<T> {
	new (): IEquivSet<T>;
	new (values?: Iterable<T> | null, opts?: any): IEquivSet<T>;
	readonly prototype: IEquivSet<T>;
}

export interface EquivSetOpts<T> {
	/**
	 * Key equivalence predicate. MUST return truthy result if given keys are
	 * considered equal.
	 *
	 * @defaultValue
	 * [`equiv()`](https://docs.thi.ng/umbrella/equiv/functions/equiv.html)
	 */
	equiv: Predicate2<T>;
}

export interface EquivMapOpts<K> extends EquivSetOpts<K> {
	/**
	 * Underlying {@link IEquivSet} implementation for storing the
	 * unique keys of the map.
	 *
	 * @defaultValue {@link ArraySet}
	 */
	keys: EquivSetConstructor<K>;
}

/**
 * Hash function for key values of type K
 */
export type HashFn<K> = Fn<K, number>;

/**
 * Creation options for HashMap class.
 */
export interface HashMapOpts<K> {
	/**
	 * Function for computing key hash codes. MUST be supplied. Only
	 * numeric hashes are supported.
	 */
	hash: HashFn<K>;
	/**
	 * Optional key equality predicate.
	 *
	 * @defaultValue
	 * [`equiv()`](https://docs.thi.ng/umbrella/equiv/functions/equiv.html)
	 */
	equiv?: Predicate2<K>;
	/**
	 * Normalized max load factor in the open (0..1) interval. The map
	 * will be resized (doubled in size) and all existing keys rehashed
	 * every time a new key is to be added and the current size exceeds
	 * this normalized load.
	 *
	 * @defaultValue 0.75
	 */
	load?: number;
	/**
	 * Initial capacity. Will be rounded up to next power of 2.
	 *
	 * @defaultValue 16
	 */
	cap?: number;
}
