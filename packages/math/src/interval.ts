/**
 * Clamps value `x` to given closed interval.
 *
 * @param x value to clamp
 * @param min lower bound
 * @param max upper bound
 */
export const clamp = (x: number, min: number, max: number) =>
    x < min ? min : x > max ? max : x;

export const clamp01 = (x: number) =>
    x < 0 ? 0 : x > 1 ? 1 : x;

export const clamp11 = (x: number) =>
    x < -1 ? -1 : x > 1 ? 1 : x;

export const wrap = (x: number, min: number, max: number) =>
    x < min ? x - min + max : x >= max ? x - max + min : x;

export const wrap01 = (x: number) =>
    x < 0 ? x + 1 : x >= 1 ? x - 1 : x;

export const wrap11 = (x: number) =>
    x < -1 ? x + 2 : x >= 1 ? x - 2 : x;

export const min2id = (a: number, b: number) =>
    a <= b ? 0 : 1;

export const min3id = (a: number, b: number, c: number) =>
    (a <= b) ?
        (a <= c ? 0 : 2) :
        (b <= c ? 1 : 2);

export const min4id = (a: number, b: number, c: number, d: number) =>
    a <= b ?
        (a <= c ?
            (a <= d ? 0 : 3) :
            (c <= d ? 2 : 3)) :
        (b <= c ?
            (b <= d ? 1 : 3) :
            (c <= d ? 2 : 3));

export const max2id = (a: number, b: number) =>
    a >= b ? 0 : 1;

export const max3id = (a: number, b: number, c: number) =>
    (a >= b) ?
        (a >= c ? 0 : 2) :
        (b >= c ? 1 : 2);

export const max4id = (a: number, b: number, c: number, d: number) =>
    a >= b ?
        (a >= c ?
            (a >= d ? 0 : 3) :
            (c >= d ? 2 : 3)) :
        (b >= c ?
            (b >= d ? 1 : 3) :
            (c >= d ? 2 : 3));

/**
 * See `smax()`.
 *
 * @param a
 * @param b
 * @param k smooth exponent (MUST be > 0)
 */
export const smin = (a: number, b: number, k: number) =>
    smax(a, b, -k);

/**
 * Smooth maximum. Note: Result values will be slightly larger than max
 * value near max(a,b) + eps due to exponential decay. Higher `k` values
 * reduce the error, but also reduce the smoothing. Recommended k=16.
 *
 * https://en.wikipedia.org/wiki/Smooth_maximum
 *
 * @param a
 * @param b
 * @param k smooth exponent (MUST be > 0)
 */
export const smax = (a: number, b: number, k: number) => {
    const ea = Math.exp(a * k);
    const eb = Math.exp(b * k);
    return (a * ea + b * eb) / (ea + eb);
};

/**
 * Same as `smin(smax(x, min, k), max, k)`.
 *
 * @param x
 * @param min
 * @param max
 * @param k
 */
export const sclamp = (x: number, min: number, max: number, k: number) =>
    smin(smax(x, min, k), max, k);

export const absMin = (a: number, b: number) =>
    Math.abs(a) < Math.abs(b) ? a : b;

export const absMax = (a: number, b: number) =>
    Math.abs(a) > Math.abs(b) ? a : b;

/**
 * http://www.musicdsp.org/showone.php?id=203
 *
 * @param e
 * @param x
 */
export const foldback = (e: number, x: number) =>
    (x < -e || x > e) ?
        Math.abs(Math.abs((x - e) % (4 * e)) - 2 * e) - e :
        x;

/**
 * Returns true iff `x` is in closed interval `[min .. max]`
 *
 * @param x
 * @param min
 * @param max
 */
export const inRange = (x: number, min: number, max: number) =>
    x >= min && x <= max;

/**
 * Returns true iff `x` is in open interval `(min .. max)`
 *
 * @param x
 * @param min
 * @param max
 */
export const inOpenRange = (x: number, min: number, max: number) =>
    x > min && x < max;
