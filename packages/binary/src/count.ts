/**
 * Returns number of 1 bits in `x`.
 *
 * @param x
 */
export const popCount = (x: number) => (
    x = x - ((x >>> 1) & 0x55555555),
    x = (x & 0x33333333) + ((x >>> 2) & 0x33333333),
    ((x + (x >>> 4) & 0xf0f0f0f) * 0x1010101) >>> 24
);

/**
 * https://en.wikipedia.org/wiki/Hamming_distance
 *
 * @param x
 * @param y
 */
export const hammingDist = (x: number, y: number) =>
    popCount(x ^ y);

/**
 * Math.clz32() polyfill (corrected).
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32$revision/1426816
 * 
 * @param x
 */
export const clz32 = (x: number) =>
    x !== 0 ?
        31 - ((Math.log(x >>> 0) / Math.LN2) | 0) :
        32;

export const ctz32 = (x: number) => {
    let c = 32;
    x &= -x;
    x && (c--);
    (x & 0x0000ffff) && (c -= 16);
    (x & 0x00ff00ff) && (c -= 8);
    (x & 0x0f0f0f0f) && (c -= 4);
    (x & 0x33333333) && (c -= 2);
    (x & 0x55555555) && (c -= 1);
    return c;
};
