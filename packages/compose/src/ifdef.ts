// SPDX-License-Identifier: Apache-2.0
import type { Fn, Nullable } from "@thi.ng/api";

/**
 * Returns f(x) iff `x` is not null or undefined.
 *
 * @param f - function
 * @param x - value
 */
export const ifDef = <A, B>(f: Fn<A, B>, x: Nullable<A>) =>
	x != null ? f(x) : undefined;
