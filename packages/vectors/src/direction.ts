import type { ReadonlyVec, Vec } from "./api.js";
import { normalize } from "./normalize.js";
import { sub } from "./sub.js";

/**
 * Computes direction vector `a` -> `b`, normalized to length `n`
 * (default 1).
 *
 * @param a -
 * @param b -
 * @param n -
 */
export const direction = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	n = 1
) => normalize(null, sub(out || a, b, a), n);
