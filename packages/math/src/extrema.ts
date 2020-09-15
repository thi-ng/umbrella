import type { FnU3 } from "@thi.ng/api";

/**
 * Returns true if `b` is a local minima, i.e. iff a > b and b < c.
 *
 * @param a -
 * @param b -
 * @param c -
 */
export const isMinima: FnU3<number, boolean> = (a, b, c) => a > b && b < c;

/**
 * Returns true if `b` is a local maxima, i.e. iff a < b and b > c.
 *
 * @param a -
 * @param b -
 * @param c -
 */
export const isMaxima: FnU3<number, boolean> = (a, b, c) => a < b && b > c;

const index = (
    pred: (a: number, b: number, c: number) => boolean,
    values: number[],
    from = 0,
    to = values.length
) => {
    to--;
    for (let i = from + 1; i < to; i++) {
        if (pred(values[i - 1], values[i], values[i + 1])) {
            return i;
        }
    }
    return -1;
};

/**
 * Returns index of the first local & internal minima found in given
 * `values` array, or -1 if no such minima exists. The search range can
 * be optionally defined via semi-open [from, to) index interval.
 *
 * @param values -
 * @param from -
 * @param to -
 */
export const minimaIndex = (values: number[], from = 0, to = values.length) =>
    index(isMinima, values, from, to);

/**
 * Returns index of the first local & internal maxima found in given
 * `values` array, or -1 if no such maxima exists. The search range can
 * be optionally defined via semi-open [from, to) index interval.
 *
 * @param values -
 * @param from -
 * @param to -
 */
export const maximaIndex = (values: number[], from = 0, to = values.length) =>
    index(isMaxima, values, from, to);

function* indices(
    fn: (a: number[], from: number, to: number) => number,
    vals: number[],
    from = 0,
    to = vals.length
) {
    while (from < to) {
        const i = fn(vals, from, to);
        if (i < 0) return;
        yield i;
        from = i + 1;
    }
}

/**
 * Returns an iterator yielding all minima indices in given `values`
 * array. The search range can be optionally defined via semi-open
 * [from, to) index interval.
 *
 * @param values -
 * @param from -
 * @param to -
 */
export const minimaIndices = (values: number[], from = 0, to = values.length) =>
    indices(minimaIndex, values, from, to);

/**
 * Returns an iterator yielding all maxima indices in given `values`
 * array. The search range can be optionally defined via semi-open
 * [from, to) index interval.
 *
 * @param values -
 * @param from -
 * @param to -
 */
export const maximaIndices = (values: number[], from = 0, to = values.length) =>
    indices(minimaIndex, values, from, to);
