import type { FnU3 } from "@thi.ng/api";
import type { Bit } from "./api";
import { defMask } from "./mask";

/**
 * Clears bit in given uint `x`.
 *
 * @param x - value
 * @param bit - bit number (0..31)
 */
export const bitClear = (x: number, bit: Bit) => (x & ~(1 << bit)) >>> 0;

/**
 * Toggles bit in given uint `x`.
 *
 * @param x - value
 * @param bit - bit ID
 */
export const bitFlip = (x: number, bit: Bit) => (x ^ (1 << bit)) >>> 0;

/**
 * Sets bit in given uint `x`.
 *
 * @param x - value
 * @param bit - bit number (0..31)
 */
export const bitSet = (x: number, bit: Bit) => (x | (1 << bit)) >>> 0;

export const bitSetWindow = (
    x: number,
    y: number,
    from: number,
    to: number
) => {
    const m = defMask(from, to);
    return (x & ~m) | ((y << (1 << from)) & m);
};

export const bitClearWindow: FnU3<number> = (x, from, to) =>
    x & ~defMask(from, to);
