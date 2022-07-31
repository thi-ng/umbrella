import type { Pow2 } from "./api.js";

/**
 * Aligns `addr` to next multiple of `size`. The latter must be a power
 * of 2.
 *
 * @param addr - value to align
 * @param size - alignment value
 */
export const align = (addr: number, size: Pow2) => (
	size--, (addr + size) & ~size
);

/**
 * Returns true if `addr` is aligned to wordsize `size`.
 */
export const isAligned = (addr: number, size: Pow2) => !(addr & (size - 1));
