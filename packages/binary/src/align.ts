import { Pow2 } from "./api";

/**
 * Aligns `addr` to next multiple of `size`. The latter must be a power
 * of 2.
 *
 * @param addr
 * @param size
 */
export const align = (addr: number, size: Pow2) =>
    (size-- , (addr + size) & ~size);

/**
 * Returns true if `addr` is aligned to wordsize `size`.
 */
export const isAligned = (addr: number, size: Pow2) =>
    !(addr & (size - 1));
