import type { PrimTerm, Term, TermType } from "@thi.ng/shader-ast";
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
export const fitNorm1 = defn(
	"float",
	"fitNorm1",
	["float", "float", "float"],
	(x, a, b) => [ret(ternary(neq(a, b), div(sub(x, a), sub(b, a)), FLOAT0))]
);

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
export const fit = <T extends PrimTerm>(
	x: T,
	a: T,
	b: T,
	c: T,
	d: T
): Term<TermType<T>> => mix(c, d, div(sub(x, a), sub(b, a)));

/**
 * Same as {@link fit}, but first clamps `x` to closed [a,b] interval.
 *
 * @param x -
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 */
export const fitClamped = <T extends PrimTerm>(
	x: T,
	a: T,
	b: T,
	c: T,
	d: T
): Term<TermType<T>> => mix(c, d, clamp01(div(sub(x, a), sub(b, a))));

/**
 * Inline function. Fits value `a` in [0..1] interval to new interval
 * [b..c]. No clamping performed. Same as `mix(b, c, a)`
 *
 * @param a -
 * @param b -
 * @param c -
 */
export const fit01 = <T extends PrimTerm>(
	a: T,
	b: T,
	c: T
): Term<TermType<T>> => mix(b, c, a);

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
