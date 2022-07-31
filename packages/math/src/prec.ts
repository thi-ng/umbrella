import type { FnN, FnN2 } from "@thi.ng/api";
import { EPS } from "./api.js";

/**
 * Similar to {@link fmod}, {@link remainder}. Returns `a - b * floor(a / b)`
 * (same as GLSL `mod(a, b)`)
 *
 * @remarks
 * **Caution:** Due to the introduction of libc math functions in v4.0.0 and the
 * resulting name/behavior clashes between the modulo logic in JS, C & GLSL,
 * this function previously _was_ called `fmod`, but going forward has been
 * renamed to align w/ its GLSL version and exhibits a different behavior to the
 * current {@link fmod} function.
 *
 * https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/mod.xhtml
 *
 * @param a -
 * @param b -
 */
export const mod: FnN2 = (a, b) => a - b * Math.floor(a / b);

export const fract: FnN = (x) => x - Math.floor(x);

export const trunc: FnN = (x) => (x < 0 ? Math.ceil(x) : Math.floor(x));

export const roundTo = (x: number, prec = 1) => Math.round(x / prec) * prec;

export const floorTo = (x: number, prec = 1) => Math.floor(x / prec) * prec;

export const ceilTo = (x: number, prec = 1) => Math.ceil(x / prec) * prec;

/**
 * Only rounds `x` to nearest int if `fract(x)` <= `eps` or >= `1-eps`.
 *
 * @param x -
 * @param eps -
 */
export const roundEps = (x: number, eps = EPS) => {
	const f = fract(x);
	return f <= eps || f >= 1 - eps ? Math.round(x) : x;
};
