// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "./null.js";

/**
 * Generic interface for collections implementing
 * stack functionality.
 *
 * @param V - value type
 * @param P - return type for pop()
 * @param S - return type for push()
 */
export interface IStack<V, P, S> {
	/**
	 * Returns top-of-stack item.
	 */
	peek(): Maybe<V>;
	/**
	 * Removes top-of-stack item and returns type P.
	 */
	pop(): Maybe<P>;
	/**
	 * Pushes item onto stack, returns type S.
	 *
	 * @param x
	 */
	push(x: V): S;
}
