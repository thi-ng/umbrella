// thing:no-export
import type { Fn2 } from "@thi.ng/api";
import { B8 } from "@thi.ng/strings/radix";

/**
 * Converts 1D bitfield to binary string.
 *
 * @param data -
 *
 * @internal
 */
export const toString = (data: Uint8Array) => [...data].map(B8).join("");

/**
 * @param dest -
 * @param src -
 * @param op -
 *
 * @internal
 */
export const binOp = (
	dest: Uint8Array,
	src: Uint8Array,
	op: Fn2<number, number, number>
) => {
	for (let i = src.length; i-- > 0; ) dest[i] = op(src[i], dest[i]);
};
