// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec, Vec } from "./api.js";
import { __ensureInputs } from "./ensure.js";
import { max } from "./max.js";
import { setN } from "./setn.js";
import { vecOf } from "./vec-of.js";

/**
 * Takes an array of vectors and computes componentwise maximum. Writes result
 * to `out` (or a new vector). If `out` is given is MUST have at least the size
 * of given input vectors (otherwise some components will have NaN results).
 *
 * @param out -
 * @param src -
 */
export const maxBounds = (out: Vec | null, src: ReadonlyVec[]) => {
	__ensureInputs(src);
	out = out ? setN(out, -Infinity) : vecOf(src[0].length, -Infinity);
	for (let i = src.length; i-- > 0; ) max(out, out, src[i]);
	return out;
};
