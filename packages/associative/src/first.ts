// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";

/**
 * Returns the first value (if any) from given iterable (e.g. a Set).
 *
 * @param x
 */
export const first = <T>(x: Iterable<T>): Maybe<T> =>
	x[Symbol.iterator]().next().value;
