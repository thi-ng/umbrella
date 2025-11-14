// SPDX-License-Identifier: Apache-2.0
import { satisfyD, satisfy } from "./satisfy.js";

/**
 * HOF predicate for matching given single char literal.
 *
 * @param c -
 */
export const litP =
	<T>(c: T) =>
	(x: T) =>
		x === c;

/**
 * Matches single char/value `c`.
 *
 * @param c -
 * @param id -
 */
export const lit = <T>(c: T, id = "lit") => satisfy<T>((x) => x === c, id);

/**
 * Discarded literal. Same as {@link lit}, but result will be discarded.
 *
 * @param c -
 */
export const litD = <T>(c: T) => satisfyD<T>((x) => x === c);
