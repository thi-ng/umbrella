// SPDX-License-Identifier: Apache-2.0
/** @internal */
const __defBits = (n: number) =>
	new Array(n).fill(0).map((_, i) => 1 << (n - 1 - i));

/**
 * 8bit values in MSB order (i.e. MSB_BITS[0] = 0x80)
 */
export const MSB_BITS8 = __defBits(8);

/**
 * 16bit values in MSB order (i.e. MSB_BITS[0] = 0x8000)
 */
export const MSB_BITS16 = __defBits(16);

/**
 * 32bit values in MSB order (i.e. MSB_BITS[0] = 0x80000000)
 */
export const MSB_BITS32 = __defBits(32);

export const MASKS = new Array(33).fill(0).map((_, i) => 2 ** i - 1);
