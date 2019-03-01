import { DEG2RAD, HALF_PI, PI, RAD2DEG, TAU } from "./api";

export const sincos = (theta: number, n = 1) => [
    Math.sin(theta) * n,
    Math.cos(theta) * n
];

export const cossin = (theta: number, n = 1) => [
    Math.cos(theta) * n,
    Math.sin(theta) * n
];

export const absTheta = (theta: number) => (
    (theta %= TAU), theta < 0 ? TAU + theta : theta
);

export const absInnerAngle = (x: number) => (
    (x = Math.abs(x)), x > PI ? TAU - x : x
);

export const angleDist = (a: number, b: number) =>
    absInnerAngle(absTheta((b % TAU) - (a % TAU)));

export const atan2Abs = (y: number, x: number) => absTheta(Math.atan2(y, x));

export const quadrant = (theta: number) => (absTheta(theta) / HALF_PI) | 0;

/**
 * Converts angle to degrees.
 *
 * @param x angle in radians
 */
export const deg = (x: number) => x * RAD2DEG;

/**
 * Converts angle to radians.
 *
 * @param x angle in degrees
 */
export const rad = (x: number) => x * DEG2RAD;
