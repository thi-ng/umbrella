// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "./null.js";

/**
 * Lisp-like sequence abstraction for arbitrary types using `first` &
 * `next` operations only.
 *
 * @remarks
 * Unlike ES6 iterators this approach does not conflate both operations
 * and `first()` can be called any number of times to obtain the current
 * value (if any) from the sequence.
 */
export interface ISeq<T> {
	/**
	 * Returns the sequence's first value or `undefined` if there're no
	 * further values.
	 *
	 * @remarks
	 * If the sequence is guaranteed to not include `undefined` values,
	 * a simple check for `seq.first() === undefined` is sufficient to
	 * determine the end. If the sequence DOES contain `undefined`
	 * values, the check should use `seq.next()`.
	 */
	first(): Maybe<T>;
	/**
	 * Returns a new sequence of the remaining elements or `undefined`
	 * if there're no further values.
	 *
	 * @remarks
	 * In general, implementations of this interface MUST always return
	 * a new sequence instance and not mutate some internal cursor. I.e.
	 * `seq.next() !== seq`
	 */
	next(): Maybe<ISeq<T>>;
}

/**
 * Interface for data types providing an {@link ISeq} abstraction.
 */
export interface ISeqable<T> {
	/**
	 * Returns an {@link ISeq} of the type's data or `undefined` if
	 * there're no values available. See {@link ISeq.next}
	 */
	seq(): Maybe<ISeq<T>>;
}
