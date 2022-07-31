import type { FnU4, FnU5, FnU6 } from "@thi.ng/api";
import type { Dual, Op4, Op5 } from "./api.js";
import { add, mul } from "./ops.js";

/**
 * Computes: `ax^2 + bx + c`. All args must have same size/arity.
 *
 * @param x -
 * @param a -
 * @param b -
 * @param c -
 */
export const quadratic: Op4 = (x, a, b, c) =>
	add(add(mul(a, mul(x, x)), mul(b, x)), c);

/**
 * Same as {@link quadratic}, but for real/scalar inputs. `x` is treated as
 * variable `x+1ε`, the rest as `n+0ε`.
 *
 * @param x -
 * @param a -
 * @param b -
 * @param c -
 */
export const quadraticS: FnU4<number, Dual> = (x, a, b, c) =>
	quadratic([x, 1], [a, 0], [b, 0], [c, 0]);

/**
 * Computes: `ax^3 + bx^2 + cx + d`. All args must have same size/arity.
 *
 * @param x -
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 */
export const cubic: Op5 = (x, a, b, c, d) => {
	const x2 = mul(x, x);
	return add(add(add(mul(a, mul(x2, x)), mul(b, x2)), mul(c, x)), d);
};

/**
 * Same as {@link cubic}, but for real/scalar inputs. `x` is treated as variable
 * `x+1ε`, the rest as `n+0ε`.
 *
 * @param x -
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 */
export const cubicS: FnU5<number, Dual> = (x, a, b, c, d) =>
	cubic([x, 1], [a, 0], [b, 0], [c, 0], [d, 0]);

/**
 * Computes: `ax^4 + bx^3 + cx^2 + dx + e`. All args must have same size/arity.
 *
 * @param x -
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 * @param e -
 */
export const quartic = (
	x: Dual,
	a: Dual,
	b: Dual,
	c: Dual,
	d: Dual,
	e: Dual
) => {
	const x2 = mul(x, x);
	const x3 = mul(x2, x);
	return add(
		add(add(add(mul(a, mul(x3, x)), mul(b, x3)), mul(c, x2)), mul(d, x)),
		e
	);
};

/**
 * Same as {@link quartic}, but for real/scalar inputs. `x` is treated as
 * variable `x+1ε`, the rest as `n+0ε`.
 *
 * @param x -
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 * @param e -
 */
export const quarticS: FnU6<number, Dual> = (x, a, b, c, d, e) =>
	quartic([x, 1], [a, 0], [b, 0], [c, 0], [d, 0], [e, 0]);
