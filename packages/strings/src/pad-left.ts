import { memoizeO } from "@thi.ng/memoize/memoizeo";
import { repeat } from "./repeat.js";

/**
 * @param n - target length
 * @param ch - pad character(s)
 */
export const padLeft: (
	n: number,
	ch?: string | number
) => (x: any, length?: number) => string = memoizeO((n, ch = " ") => {
	const buf = repeat(String(ch), n);
	return (x: any, len?: number) => {
		if (x == null) return buf;
		x = x.toString();
		len = len !== undefined ? len : x.length;
		return len! < n ? buf.substring(len!) + x : x;
	};
});

/**
 * Zero-padded 2 digit formatter.
 */
export const Z2 = padLeft(2, "0");

/**
 * Zero-padded 3 digit formatter.
 */
export const Z3 = padLeft(3, "0");

/**
 * Zero-padded 4 digit formatter.
 */
export const Z4 = padLeft(4, "0");
