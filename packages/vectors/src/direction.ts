import type { ReadonlyVec, Vec } from "./api.js";
import { normalize, normalize2, normalize3 } from "./normalize.js";
import { sub, sub2, sub3 } from "./sub.js";

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

export const direction2 = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	n = 1
) => normalize2(null, sub2(out || a, b, a), n);

export const direction3 = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	n = 1
) => normalize3(null, sub3(out || a, b, a), n);
