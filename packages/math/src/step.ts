import type { FnN, FnN2, FnN3 } from "@thi.ng/api";
import { clamp01 } from "./interval.js";

/**
 * Step/threshold function.
 *
 * @param edge - threshold
 * @param x - test value
 * @returns 0, if `x < e`, else 1
 */
export const step: FnN2 = (edge, x) => (x < edge ? 0 : 1);

/**
 * GLSL-style smoothStep threshold function.
 *
 * @remarks
 * Also see {@link smoothStep01}, {@link smootherStep}.
 *
 * @param edge - lower threshold
 * @param edge2 - upper threshold
 * @param x - test value
 * @returns 0, if `x < edge1`, 1 if `x > edge2`, else S-curve polynomial interpolation
 */
export const smoothStep: FnN3 = (edge, edge2, x) =>
	smoothStep01(clamp01((x - edge) / (edge2 - edge)));

/**
 * Specialized version of {@link smoothStep}, assuming edges are 0/1
 * respectively and `x` is in [0..1]. No clamping performed.
 *
 * @param x
 */
export const smoothStep01: FnN = (x) => x * x * (3 - 2 * x);

/**
 * Similar to {@link smoothStep} but using different, higher degree polynomial.
 *
 * @remarks
 * Also see {@link smootherStep01}.
 *
 * @param edge -
 * @param edge2 -
 * @param x -
 */
export const smootherStep: FnN3 = (edge, edge2, x) =>
	smootherStep01(clamp01((x - edge) / (edge2 - edge)));

/**
 * Specialized version of {@link smootherStep}, assuming edges are 0/1
 * respectively and `x` is in [0..1]. No clamping performed.
 *
 * @param x
 */
export const smootherStep01: FnN = (x) => x * x * x * (x * (x * 6 - 15) + 10);

/**
 * Exponential ramp with variable shape
 *
 * @remarks
 * Example configurations:
 *
 * - S-curve: k=8, n=4
 * - Step near 1.0: k=8, n=20
 * - Pulse: k=0.005, n=-10
 * - Ease-in: k=0.5, n=0.25
 *
 * Interactive graph: https://www.desmos.com/calculator/gcnuyppycz
 *
 * @param k -
 * @param n -
 * @param x -
 */
export const expStep: FnN3 = (k, n, x) => 1 - Math.exp(-k * Math.pow(x, n));
