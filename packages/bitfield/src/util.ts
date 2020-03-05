import { B32 } from "@thi.ng/strings";

/**
 * Converts 1D bitfield to binary string.
 *
 * @param data -
 *
 * @internal
 */
export const toString = (data: Uint32Array) => [...data].map(B32).join("");
