import type { Prim, PrimTerm, Term, TermType } from "@thi.ng/shader-ast";
import { F } from "@thi.ng/shader-ast/api/types";
import { ternary } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT0, FLOAT05, FLOAT1, FLOAT2 } from "@thi.ng/shader-ast/ast/lit";
import { add, div, mul, neq, sub } from "@thi.ng/shader-ast/ast/ops";
import { mix } from "@thi.ng/shader-ast/builtin/math";
import { clamp01 } from "./clamp.js";

/**
 * Returns normalized value of `x` WRT to interval [a,b]. Returns 0, if
 * `a` equals `b`.
 *
 * @param x -
 * @param a -
 * @param b -
 */
export const fitNorm1 = defn(F, "fitNorm1", [F, F, F], (x, a, b) => [
	ret(ternary(neq(a, b), div(sub(x, a), sub(b, a)), FLOAT0)),
]);

/**
 * Similar to {@link fitNorm1} but also for vector types and without checking if
 * `a == b`. Scales value `x` from closed interval [a,b] to closed [0,1]
 * interval. No clamping performed.
 *
 * @param x
 * @param a
 * @param b
 */
export const fitNorm = <T extends Prim>(x: Term<T>, a: Term<T>, b: Term<T>) =>
	div(sub(x, a), sub(b, a));

/**
 * Fits value `x` from closed interval [a,b] to closed interval [c,d]. No
 * clamping performed.
 *
 * @param x -
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 */
export const fit = <T extends Prim>(
	x: Term<T>,
	a: Term<T>,
	b: Term<T>,
	c: Term<T>,
	d: Term<T>
) => mix(c, d, fitNorm(x, a, b));

/**
 * Same as {@link fit}, but first clamps `x` to closed [a,b] interval.
 *
 * @param x -
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 */
export const fitClamped = <T extends Prim>(
	x: Term<T>,
	a: Term<T>,
	b: Term<T>,
	c: Term<T>,
	d: Term<T>
) => mix(c, d, clamp01(div(sub(x, a), sub(b, a))));

/**
 * Inline function. Fits value `a` in [0..1] interval to new interval
 * [b..c]. No clamping performed. Same as `mix(b, c, a)`
 *
 * @param a -
 * @param b -
 * @param c -
 */
export const fit01 = <T extends Prim>(
	a: Term<T>,
	b: Term<T>,
	c: Term<T>
): Term<T> => mix(b, c, a);

/**
 * Inline function. Fits value `x` in [-1..+1] interval to [0..1]
 * interval. No clamping performed.
 *
 * @param x -
 */
export const fit1101 = <T extends PrimTerm>(x: T): Term<TermType<T>> =>
	add(mul(x, FLOAT05), FLOAT05);

/**
 * Inline function. Fits value `x` in [0..1] interval to [-1..+1]
 * interval. No clamping performed.
 *
 * @param x -
 */
export const fit0111 = <T extends PrimTerm>(x: T): Term<TermType<T>> =>
	sub(mul(x, FLOAT2), FLOAT1);
