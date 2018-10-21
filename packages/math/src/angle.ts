import {
    DEG2RAD,
    HALF_PI,
    PI,
    RAD2DEG,
    TAU
} from "./api";

export const sincos = (theta: number) =>
    [Math.sin(theta), Math.cos(theta)];

export const absTheta = (theta: number) =>
    (theta %= TAU, theta < 0 ? TAU + theta : theta);

export const angleDist = (a: number, b: number) =>
    (a = absTheta((b % TAU) - (a % TAU)), a > PI ? TAU - a : a);

export const atan2Abs = (y: number, x: number) =>
    absTheta(Math.atan2(y, x));

export const quadrant = (theta: number) =>
    (absTheta(theta) / HALF_PI) | 0;

/**
 * Converts angle to degrees.
 *
 * @param x angle in radians
 */
export const deg = (x: number) =>
    x * RAD2DEG;

/**
 * Converts angle to radians.
 *
 * @param x angle in degrees
 */
export const rad = (x: number) =>
    x * DEG2RAD;
