import type { FnN2, FnU, FnU2, FnU3, FnU4 } from "@thi.ng/api";
import {
    EPS,
    eqDelta,
    fit,
    fitClamped,
    gaussian as $gaussian,
    sigmoid as $sigmoid,
} from "@thi.ng/math";
import type { FuzzyFn } from "./api";
import { combineTerms } from "./combine";

/**
 * HOF {@link FuzzyFn} always yielding given `x` (should be in [0,1]
 * interval).
 *
 * @param x
 */
export const constant = (x: number): FuzzyFn => () => x;

/**
 * HOF {@link FuzzyFn} which takes a value `p` and tolerance `eps`, then yields
 * a discrete window function: `|p - x| <= eps ? 1 : 0`
 *
 * @param p
 * @param eps
 */
export const point = (p: number, eps = EPS): FuzzyFn => (x) =>
    eqDelta(x, p, eps) ? 1 : 0;

/**
 * HOF {@link FuzzyFn} yielding a rising ramp in [a,b] interval, clamped to
 * [0,1] outputs. Returns 0.0 for inputs <= `a` and 1.0 for inputs >= `b`.
 *
 * @param a
 * @param b
 */
export const ramp: FnU2<number, FuzzyFn> = (a, b) => (x) =>
    fitClamped(x, a, b, 0, 1);

/**
 * HOF {@link FuzzyFn} yielding a triangle in the input range `[a..b..c]` with
 * `b` defining the position of the peak value (1.0). Returns 0.0 for inputs <
 * `a` or > `c`.
 *
 * @param a
 * @param b
 * @param c
 */
export const triangle: FnU3<number, FuzzyFn> = (a, b, c) => (x) =>
    x < a || x > c ? 0 : x <= b ? fit(x, a, b, 0, 1) : fit(x, b, c, 1, 0);

/**
 * Similar to {@link triangle}, but yielding a trapezoid for the input range
 * `[a..b..c..d]` with `b` and `c` defining the peak value range (with 1.0
 * outputs). Returns 0.0 for inputs < `a` or > `d`.
 *
 * @param a
 * @param b
 * @param c
 * @param d
 */
export const trapezoid: FnU4<number, FuzzyFn> = (a, b, c, d) => (x) =>
    x < a || x > d
        ? 0
        : x > b && x < c
        ? 1
        : x <= b
        ? fit(x, a, b, 0, 1)
        : fit(x, c, d, 1, 0);

/**
 * HOF {@link FuzzyFn}, yielding sigmoid curve with configurable `steep` and
 * positioned such that `f(bias) = 0.5`.
 *
 * @param bias
 * @param steep
 */
export const sigmoid: FnU2<number, FuzzyFn> = (bias, steep) => (x) =>
    $sigmoid(bias, steep, x);

/**
 * HOF {@link FuzzyFn}, yielding gaussian bell curve with its peak at `bias` and
 * width defined by `sigma`.
 *
 * @param bias
 * @param sigma
 */
export const gaussian: FnU2<number, FuzzyFn> = (bias, sigma) => (x) =>
    $gaussian(bias, sigma, x);

/**
 * Higher-order function: Takes an existing {@link FuzzyFn} `fn` and returns
 * a new one producing its negated outcome aka `1 - fn(x)`.
 *
 * @param fn
 */
export const negate: FnU<FuzzyFn> = (fn) => (x) => 1 - fn(x);

/**
 * Inverse of {@link ramp}, i.e. a falling slope from `a` -> `b`.
 *
 * @param a
 * @param b
 */
export const invRamp: FnU2<number, FuzzyFn> = (a, b) => negate(ramp(a, b));

/**
 * Inverse of {@link sigmoid}.
 *
 * @param bias
 * @param steep
 */
export const invSigmoid: FnU2<number, FuzzyFn> = (bias, steep) =>
    negate(sigmoid(bias, steep));

/**
 * Higher-order function: Takes an existing {@link FuzzyFn} `fn` and `weight`
 * factor. Returns new function which computes: `weight * fn(x)`.
 *
 * @param fn
 * @param weight
 */
export const weighted = (fn: FuzzyFn, weight: number): FuzzyFn => (x) =>
    weight * fn(x);

/**
 * Complex shape generator. Takes a T-norm (or S-norm) as reduction function
 * `op` and any number of {@link FuzzyFn}s. Returns new `FuzzyFn` which
 * evaluates all given `fns` and combines/reduces their results with `op`.
 *
 * @remarks
 * Depending on the use case and choice of `op`, the `initial` value should
 * either be set to:
 *
 * - T-norm like function: 1.0
 * - S-norm like function: 0.0
 *
 * References:
 * - https://www.desmos.com/calculator/pnq6kqzfb5 (interactive graph)
 * - https://en.wikipedia.org/wiki/T-norm
 * - https://github.com/thi-ng/umbrella/blob/develop/packages/math/src/tnorms.ts
 *
 * @example
 * ```ts
 * // M-like shape w/ peaks at 3 & 5
 * const M = compose(
 *   Math.max,
 *   0,
 *   triangle(1,3,5),
 *   triangle(3,5,7)
 * )
 *
 * M(3) // 1
 * M(4) // 0.5
 * M(5) // 1
 * ```
 *
 * @param op
 * @param initial
 * @param fns
 */
export const compose = (
    op: FnN2,
    initial: number,
    ...fns: FuzzyFn[]
): FuzzyFn => (x) => combineTerms(op, fns, x, initial);
