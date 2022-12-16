import type { FnN } from "@thi.ng/api";

/**
 * Converts 32bit unsigned int to Gray code (reflected binary). Gray codes of
 * successive values always have a Hamming distance of 1 (i.e. only 1 bit
 * changes at a time).
 *
 * @remarks
 * Reference:
 * - https://en.wikipedia.org/wiki/Gray_code
 *
 * @param x - u32
 */
export const encodeGray32: FnN = (x) => (x ^ (x >>> 1)) >>> 0;

/**
 * Converts 32bit Gray code to binary / unsigned int.
 *
 * @remarks
 * Reference:
 * - https://en.wikipedia.org/wiki/Gray_code
 */
export const decodeGray32: FnN = (x) => {
	x = x ^ (x >>> 16);
	x = x ^ (x >>> 8);
	x = x ^ (x >>> 4);
	x = x ^ (x >>> 2);
	x = x ^ (x >>> 1);
	return x >>> 0;
};
