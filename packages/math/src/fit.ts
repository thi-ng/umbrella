import { clamp01, clamp11 } from "./interval";

/**
 * Returns normalized value of `x` WRT to interval `a .. b`. If `a`
 * equals `b`, returns 0.
 *
 * @param x
 * @param a
 * @param b
 */
export const norm = (x: number, a: number, b: number) =>
    b !== a ? (x - a) / (b - a) : 0;

export const fit = (x: number, a: number, b: number, c: number, d: number) =>
    c + (d - c) * norm(x, a, b);

export const fitClamped = (x: number, a: number, b: number, c: number, d: number) =>
    c + (d - c) * clamp01(norm(x, a, b));

export const fit01 = (x: number, a: number, b: number) =>
    a + (b - a) * clamp01(x);

export const fit10 = (x: number, a: number, b: number) =>
    b + (a - b) * clamp01(x);

export const fit11 = (x: number, a: number, b: number) =>
    a + (b - a) * (0.5 + 0.5 * clamp11(x));
