import type { Predicate2 } from "@thi.ng/api";

const eqStrict = (a: any, b: any) => a === b;

/**
 * Computes Levenshtein distance w/ optionally given `maxDist` (for
 * early termination, default: ∞) and equality predicate (default:
 * `===`). Returns 0 if both `a` and `b` are equal (based on predicate).
 * Returns `Infinity` if actual distance > `maxDist`.
 *
 * @remarks
 *
 * Based on:
 * - https://en.wikipedia.org/wiki/Levenshtein_distance
 * - https://en.wikipedia.org/wiki/Wagner%E2%80%93Fischer_algorithm
 * - https://github.com/gustf/js-levenshtein/blob/develop/index.js
 *
 * @example
 * ```ts
 * levenshtein([1, 2, 3, 4, 5], [1, 2, 4, 3, 5]);
 * // 2
 *
 * levenshtein(
 *   [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
 *   [{ id: 4 }, { id: 5 }, { id: 3 }, { id: 1 }, { id: 2 }],
 *   // max dist
 *   2,
 *   // predicate
 *   (a, b) => a.id === b.id
 * )
 * // Infinity
 * ```
 *
 * @param a -
 * @param b -
 * @param maxDist -
 * @param equiv -
 */
export const levenshtein = <T>(
    a: ArrayLike<T>,
    b: ArrayLike<T>,
    maxDist = Infinity,
    equiv: Predicate2<T> = eqStrict
): number => {
    if (a === b) {
        return 0;
    }
    if (a.length > b.length) {
        const tmp = a;
        a = b;
        b = tmp;
    }

    let la = a.length;
    let lb = b.length;
    while (la > 0 && equiv(a[~-la], b[~-lb])) {
        la--;
        lb--;
    }

    let offset = 0;
    while (offset < la && equiv(a[offset], b[offset])) {
        offset++;
    }

    la -= offset;
    lb -= offset;
    if (la === 0 || lb < 3) {
        return lb;
    }

    let x = 0;
    let y: number;
    let minDist: number;
    let d0: number;
    let d1: number;
    let d2: number;
    let d3: number;
    let dd: number;
    let dy: number;
    let ay: T;
    let bx0: T;
    let bx1: T;
    let bx2: T;
    let bx3: T;

    const _min = (d0: number, d1: number, d2: number, bx: T, ay: T) => {
        return d0 < d1 || d2 < d1
            ? d0 > d2
                ? d2 + 1
                : d0 + 1
            : equiv(ay, bx)
            ? d1
            : d1 + 1;
    };

    const vector: (T | number)[] = [];
    for (y = 0; y < la; y++) {
        vector.push(y + 1, a[offset + y]);
    }

    const len = vector.length - 1;
    const lb3 = lb - 3;
    for (; x < lb3; ) {
        bx0 = b[offset + (d0 = x)];
        bx1 = b[offset + (d1 = x + 1)];
        bx2 = b[offset + (d2 = x + 2)];
        bx3 = b[offset + (d3 = x + 3)];
        dd = x += 4;
        minDist = Infinity;
        for (y = 0; y < len; y += 2) {
            dy = <number>vector[y];
            ay = <T>vector[y + 1];
            d0 = _min(dy, d0, d1, bx0, ay);
            d1 = _min(d0, d1, d2, bx1, ay);
            d2 = _min(d1, d2, d3, bx2, ay);
            dd = _min(d2, d3, dd, bx3, ay);
            dd < minDist && (minDist = dd);
            vector[y] = dd;
            d3 = d2;
            d2 = d1;
            d1 = d0;
            d0 = dy;
        }
        if (minDist > maxDist) return Infinity;
    }

    for (; x < lb; ) {
        bx0 = b[offset + (d0 = x)];
        dd = ++x;
        minDist = Infinity;
        for (y = 0; y < len; y += 2) {
            dy = <number>vector[y];
            vector[y] = dd = _min(dy, d0, dd, bx0, <T>vector[y + 1]);
            dd < minDist && (minDist = dd);
            d0 = dy;
        }
        if (minDist > maxDist) return Infinity;
    }

    return dd!;
};

/**
 * Normalized version of {@link levenshtein}, i.e. the actual L-dist
 * divided by the length of the longest input (or `Infinity` if actual
 * distance > `maxDist`).
 *
 * @param a -
 * @param b -
 * @param maxDist -
 * @param equiv -
 */
export const normalizedLevenshtein = <T>(
    a: ArrayLike<T>,
    b: ArrayLike<T>,
    maxDist = Infinity,
    equiv = eqStrict
): number => {
    const n = Math.max(a.length, b.length);
    return n > 0 ? levenshtein(a, b, maxDist, equiv) / n : 0;
};
