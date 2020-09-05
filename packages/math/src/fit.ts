import type { FnN3, FnN5 } from "@thi.ng/api";
import { clamp01, clamp11 } from "./interval";

/**
 * Returns normalized value of `x` WRT to interval `a .. b`. If `a`
 * equals `b`, returns 0.
 *
 * @param x -
 * @param a -
 * @param b -
 */
export const norm: FnN3 = (x, a, b) => (b !== a ? (x - a) / (b - a) : 0);

export const fit: FnN5 = (x, a, b, c, d) => c + (d - c) * norm(x, a, b);

export const fitClamped: FnN5 = (x, a, b, c, d) =>
    c + (d - c) * clamp01(norm(x, a, b));

export const fit01: FnN3 = (x, a, b) => a + (b - a) * clamp01(x);

export const fit10: FnN3 = (x, a, b) => b + (a - b) * clamp01(x);

export const fit11: FnN3 = (x, a, b) => a + (b - a) * (0.5 + 0.5 * clamp11(x));
