import { memoizeJ } from "@thi.ng/memoize";
import { Stringer } from "./api";
import { repeat } from "./repeat";

/**
 * Returns a `Stringer` which formats given numbers to `radix`, `len`
 * and with optional prefix (not included in `len`).
 *
 * @param radix
 * @param len
 * @param prefix
 */
export const radix: (
    radix: number,
    len: number,
    prefix?: string
) => Stringer<number> = memoizeJ(
    (radix: number, n: number, prefix: string = "") => {
        const buf = repeat("0", n);
        return (x: any) => {
            x = (x >>> 0).toString(radix);
            return prefix + (x.length < n ? buf.substr(x.length) + x : x);
        };
    }
);

/**
 * 8bit binary conversion preset.
 */
export const B8 = radix(2, 8);

/**
 * 16bit binary conversion preset.
 */
export const B16 = radix(2, 16);

/**
 * 32bit binary conversion preset.
 */
export const B32 = radix(2, 32);

/**
 * 8bit hex conversion preset.
 * Assumes unsigned inputs.
 */
export const U8 = radix(16, 2);

/**
 * 16bit hex conversion preset.
 * Assumes unsigned inputs.
 */
export const U16 = radix(16, 4);

/**
 * 24bit hex conversion preset.
 * Assumes unsigned inputs.
 */
export const U24 = radix(16, 6);

/**
 * 32bit hex conversion preset.
 * Assumes unsigned inputs.
 */
export const U32 = radix(16, 8);

/**
 * 64bit hex conversion preset (2x 32bit ints)
 * Assumes unsigned inputs.
 */
export const U64 = (hi: number, lo: number) => U32(hi) + U32(lo);
