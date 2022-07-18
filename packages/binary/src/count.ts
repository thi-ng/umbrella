import type { FnN, FnN2 } from "@thi.ng/api";

/**
 * Returns number of 1 bits in `x`.
 *
 * @param x -
 */
export const popCount: FnN = (x) => (
    (x = x - ((x >>> 1) & 0x55555555)),
    (x = (x & 0x33333333) + ((x >>> 2) & 0x33333333)),
    (((x + (x >>> 4)) & 0xf0f0f0f) * 0x1010101) >>> 24
);

/**
 * Returns number of set bits (1's) in the given array (index range).
 *
 * @param data -
 * @param start -
 * @param n -
 */
export const popCountArray = (
    data: Uint32Array,
    start = 0,
    n = data.length
) => {
    let num = 0;
    for (let end = start + n; start < end; start++) {
        const x = data[start];
        x > 0 && (num += popCount(x));
    }
    return num;
};

/**
 * Returns number of bit changes between `x` and `y`.
 *
 * {@link https://en.wikipedia.org/wiki/Hamming_distance}
 *
 * @param x -
 * @param y -
 */
export const hammingDist: FnN2 = (x, y) => popCount(x ^ y);

/**
 * Math.clz32() polyfill (corrected).
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32$revision/1426816}
 *
 * @param x -
 */
export const clz32: FnN = (x) =>
    x !== 0 ? 31 - ((Math.log(x >>> 0) / Math.LN2) | 0) : 32;

export const ctz32: FnN = (x) => {
    let c = 32;
    x &= -x;
    x && c--;
    x & 0x0000ffff && (c -= 16);
    x & 0x00ff00ff && (c -= 8);
    x & 0x0f0f0f0f && (c -= 4);
    x & 0x33333333 && (c -= 2);
    x & 0x55555555 && (c -= 1);
    return c;
};

/**
 * Returns the number of bits required to encode `x`. Returns zero if
 * `x` <= 1.
 *
 * @param x -
 */
export const bitSize: FnN = (x) => (x > 1 ? Math.ceil(Math.log2(x)) : 0);
