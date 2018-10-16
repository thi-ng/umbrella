import { clamp01 } from "./interval";

/**
 * Step/threshold function.
 *
 * @param edge threshold
 * @param x test value
 * @returns 0, if `x < e`, else 1
 */
export const step = (edge: number, x: number) =>
    x < edge ? 0 : 1;

/**
 * GLSL-style smoothStep threshold function.
 *
 * @param edge lower threshold
 * @param edge2 upper threshold
 * @param x test value
 * @returns 0, if `x < edge1`, 1 if `x > edge2`, else sigmoid interpolation
 */
export const smoothStep = (edge: number, edge2: number, x: number) => {
    x = clamp01((x - edge) / (edge2 - edge));
    return (3 - 2 * x) * x * x;
};

/**
 * Similar to `smoothStep()` but using different polynomial.
 *
 * @param edge
 * @param edge2
 * @param x
 */
export const smootherStep = (edge: number, edge2: number, x: number) => {
    x = clamp01((x - edge) / (edge2 - edge));
    return x * x * x * (x * (x * 6 - 15) + 10);
};

/**
 * Exponential ramp with variable shape, e.g.
 *
 * - S-curve: k=8, n=4
 * - Step near 1.0: k=8, n=20
 * - Pulse: k=0.005, n=-10
 * - Ease-in: k=0.5, n=0.25
 *
 * @param k
 * @param n
 * @param x
 */
export const expStep = (k: number, n: number, x: number) =>
    1 - Math.exp(-k * Math.pow(x, n));
