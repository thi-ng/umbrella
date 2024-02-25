import type { FnN2 } from "@thi.ng/api";
import { floatToUintBits } from "@thi.ng/binary/float";
import { rotateLeft } from "@thi.ng/binary/rotate";
import type { ReadonlyVec } from "./api.js";

const imul = Math.imul;

/**
 * Returns an unsigned 32-bit hash code for the given vector.
 *
 * @remarks
 * The hash is the reduction of `hash = H * hash + murmur(x)`, where `murmur(x)`
 * is the partial Murmur3 hash of a single vector component's bitwise
 * representation and `H` an optional hash factor, by default Knuth's 0x9e3779b1
 * (see TAOCP, section 6.4, page 516). If the vector `v` is empty (length 0),
 * the function returns -1.
 *
 * Hashes for zero-vectors:
 *
 * - `[0]`: 1209856430
 * - `[0, 0]`: 3623989185
 * - `[0, 0, 0]`: 4192292821
 * - `[0, 0, 0, 0]`: 2558592725
 *
 * @example
 * Hash collisions:
 *
 * ```ts
 * import { hash } from "@thi.ng/vectors";
 * import {
 *   conj, map, normRange, permutations, range2d, transduce
 * } from "@thi.ng/transducers";
 *
 * // integer grid coords
 * uniq = transduce(map(hash), conj(), range2d(0x1000, 0x1000)).size
 * // 16744420
 *
 * // collision rate
 * (1 - uniq / (0x1000 ** 2)) * 100
 * // 0.1955 %
 *
 * // normalized grid coords
 * uniq = transduce(
 *   map(hash),
 *   conj(),
 *   permutations(normRange(1000), normRange(1000))
 * ).size
 * // 1001895
 *
 * // collision rate
 * (1 - uniq / (1001 ** 2)) * 100
 * // 0.0106 %
 * ```
 *
 * - https://github.com/thi-ng/c-thing/blob/develop/src/math/hashfn.c
 * - [`thi.ng/morton`](https://thi.ng/morton) for Z-curve ordered hashing
 *
 * @param v - vector
 * @param hash - hash factor
 */
export const hash = (v: ReadonlyVec, H = 0x9e3779b1) => {
	let hash = -1;
	for (let i = v.length; i-- > 0; ) {
		hash = (imul(H, hash) + mix(hash, floatToUintBits(v[i]))) >>> 0;
	}
	return hash;
};

const M1 = 0xcc9e2d51;
const M2 = 0x1b873593;
const M3 = 0xe6546b64;

const mix: FnN2 = (h, k) => {
	k = imul(rotateLeft(imul(k, M1) >>> 0, 15), M2) >>> 0;
	return ((imul(rotateLeft(h ^ k, 13), 5) >>> 0) + M3) >>> 0;
};

/**
 * Computes unsigned int hash code for given 2D coordinates.
 *
 * @param x
 * @param y
 */
export const hash2 = (x: number, y: number) =>
	(imul(x, M1) ^ imul(y, M3)) >>> 0;

/**
 * Computes unsigned int hash code for given 3D coordinates.
 *
 * @param x
 * @param y
 */
export const hash3 = (x: number, y: number, z: number) =>
	(imul(x, M1) ^ imul(y, M2) ^ imul(z, M3)) >>> 0;
