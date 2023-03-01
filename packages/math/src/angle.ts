import type { FnN, FnN2, FnN3 } from "@thi.ng/api";
import { DEG2RAD, HALF_PI, INV_HALF_PI, PI, RAD2DEG, TAU } from "./api.js";

/**
 * Returns vector of `[sin(theta)*n, cos(theta)*n]`.
 *
 * @param theta -
 * @param n -
 */
export const sincos = (theta: number, n = 1): [number, number] => [
	Math.sin(theta) * n,
	Math.cos(theta) * n,
];

/**
 * Returns vector of `[cos(theta)*n, sin(theta)*n]`.
 *
 * @param theta -
 * @param n -
 */
export const cossin = (theta: number, n = 1): [number, number] => [
	Math.cos(theta) * n,
	Math.sin(theta) * n,
];

/**
 * Projects `theta` into [0 .. 2π] interval.
 *
 * @param theta -
 */
export const absTheta: FnN = (theta) => (
	(theta %= TAU), theta < 0 ? TAU + theta : theta
);

export const absInnerAngle: FnN = (theta) => (
	(theta = Math.abs(theta)), theta > PI ? TAU - theta : theta
);

/**
 * Returns smallest absolute angle difference between `a` and `b`.
 * Result will be in [0 .. π] interval.
 *
 * @param a -
 * @param b -
 */
export const angleDist: FnN2 = (a, b) =>
	absInnerAngle(absTheta((b % TAU) - (a % TAU)));

/**
 * Like `Math.atan2`, but always returns angle in [0 .. TAU) interval.
 *
 * @param y -
 * @param x -
 */
export const atan2Abs: FnN2 = (y, x) => absTheta(Math.atan2(y, x));

/**
 * Returns quadrant ID (0-3) of given angle (in radians).
 *
 * @param theta -
 */
export const quadrant: FnN = (theta) => (absTheta(theta) * INV_HALF_PI) | 0;

/**
 * Converts angle to degrees.
 *
 * @param theta - angle in radians
 */
export const deg: FnN = (theta) => theta * RAD2DEG;

/**
 * Converts angle to radians.
 *
 * @param theta - angle in degrees
 */
export const rad: FnN = (theta) => theta * DEG2RAD;

/**
 * Cosecant. Approaches `±Infinity` for `theta` near multiples of π.
 *
 * @param theta - angle in radians
 */
export const csc: FnN = (theta) => 1 / Math.sin(theta);

/**
 * Secant. Approaches `±Infinity` for `theta` near π/2 ± nπ
 *
 * @param theta - angle in radians
 */
export const sec: FnN = (theta) => 1 / Math.cos(theta);

/**
 * Cotangent. Approaches `±Infinity` for `theta` near multiples of π.
 *
 * @param theta - angle in radians
 */
export const cot: FnN = (theta) => 1 / Math.tan(theta);

/**
 * Law of Cosines. Takes length of two sides of a triangle and the inner
 * angle (in radians) between them. Returns length of third side.
 *
 * @param a -
 * @param b -
 * @param gamma -
 */
export const loc: FnN3 = (a, b, gamma) =>
	Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(gamma));

/**
 * Approximates cos(xπ) for x in [-1,1]
 *
 * @param x -
 */
export const normCos: FnN = (x) => {
	const x2 = x * x;
	return 1.0 + x2 * (-4 + 2 * x2);
};

const __fastCos: FnN = (x) => {
	const x2 = x * x;
	return 0.99940307 + x2 * (-0.49558072 + 0.03679168 * x2);
};

/**
 * Fast cosine approximation using {@link normCos} (polynomial). Max. error
 * ~0.00059693
 *
 * In [0 .. 2π] interval, approx. 18-20% faster than `Math.cos` on V8.
 *
 * @param theta - in radians
 */
export const fastCos: FnN = (theta) => {
	theta %= TAU;
	theta < 0 && (theta = -theta);
	switch ((theta * INV_HALF_PI) | 0) {
		case 0:
			return __fastCos(theta);
		case 1:
			return -__fastCos(PI - theta);
		case 2:
			return -__fastCos(theta - PI);
		default:
			return __fastCos(TAU - theta);
	}
};

/**
 * {@link fastCos}
 *
 * @param theta - in radians
 */
export const fastSin: FnN = (theta) => fastCos(HALF_PI - theta);
