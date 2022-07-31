import type { Range0_31 } from "@thi.ng/api";
import { clz32 } from "./count.js";

/**
 * Converts binary `x` to one-hot format.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/One-hot
 *
 * @param x -
 */
export const binaryOneHot = (x: Range0_31) => (1 << x) >>> 0;

/**
 * Converts one-hot `x` into binary, i.e. the position of the hot bit.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/One-hot
 *
 * @param x -
 */
export const oneHotBinary = (x: number) => 31 - clz32(x);
