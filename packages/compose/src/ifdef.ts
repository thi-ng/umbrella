import type { Fn } from "@thi.ng/api";

/**
 * Returns f(x) iff `x` is not null or undefined.
 *
 * @param f - function
 * @param x - value
 */
export const ifDef = <A, B>(f: Fn<A, B>, x: A | null | undefined) =>
	x != null ? f(x) : undefined;
