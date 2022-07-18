// thing:no-export
import type { Fn2 } from "@thi.ng/api";
import { B32 } from "@thi.ng/strings/radix";

/**
 * Converts 1D bitfield to binary string.
 *
 * @param data -
 *
 * @internal
 */
export const toString = (data: Uint32Array) => [...data].map(B32).join("");

/**
 * @param dest -
 * @param src -
 * @param op -
 *
 * @internal
 */
export const binOp = (
    dest: Uint32Array,
    src: Uint32Array,
    op: Fn2<number, number, number>
) => {
    for (let i = src.length; i-- > 0; ) dest[i] = op(src[i], dest[i]);
};
