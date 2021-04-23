import type { FnN, FnN2, FnN3 } from "@thi.ng/api";

/**
 * Returns a value with the magnitude of `x` and the sign of `y`.
 *
 * @param x
 * @param y
 */
export const copysign: FnN2 = (x, y) => Math.sign(y) * Math.abs(x);

/**
 * Returns `2^x`.
 *
 * @param x
 */
export const exp2: FnN = (x) => 2 ** x;

/**
 * Returns the positive difference between `x` and `y`, i.e. `x - y` iff `x > y`,
 * otherwise zero.
 *
 * @param x
 * @param y
 */
export const fdim: FnN2 = (x, y) => Math.max(x - y, 0);

/**
 * Returns `x * y + z`.
 *
 * @param x
 * @param y
 * @param z
 */
export const fma: FnN3 = (x, y, z) => x * y + z;

/**
 * Inverse op of {@link ldexp}. Breaks the number `x` into its binary
 * significand (a floating point with an abs value in `[0.5,1.0)` interval and
 * an integral exponent for 2, such that: `x = significand * 2^exp`. Returns
 * tuple of `[sig, exp]`.
 *
 * @remarks
 * - If `x` is zero, both parts (significand and exponent) are zero.
 * - If `x` is negative, the significand returned by this function is negative.
 *
 * Based on:
 * https://github.com/locutusjs/locutus/blob/master/src/c/math/frexp.js
 *
 * @param x
 */
export const frexp = (x: number) => {
    if (x === 0 || !isFinite(x)) return [x, 0];

    const abs = Math.abs(x);
    let exp = Math.max(-1023, Math.floor(Math.log2(abs)) + 1);
    let y = abs * 2 ** -exp;
    while (y < 0.5) {
        y *= 2;
        exp--;
    }
    while (y >= 1) {
        y *= 0.5;
        exp++;
    }
    return [x < 0 ? -y : y, exp];
};

/**
 * Inverse op of {@link frexp}. Returns `x * 2^exp`
 *
 * @param x
 * @param exp
 */
export const ldexp: FnN2 = (x, exp) => x * 2 ** exp;
