import type { Fn, Fn2, Predicate, Predicate2 } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { cossin } from "@thi.ng/math/angle";
import { addmN2, submN2, type ReadonlyVec } from "@thi.ng/vectors";
import { add2 } from "@thi.ng/vectors/add";
import { cartesian2 } from "@thi.ng/vectors/cartesian";
import { divN2 } from "@thi.ng/vectors/divn";
import { eqDelta2 } from "@thi.ng/vectors/eqdelta";
import { equals2 } from "@thi.ng/vectors/equals";
import { maddN2 } from "@thi.ng/vectors/maddn";
import { magSq2 } from "@thi.ng/vectors/magsq";
import { mulN2 } from "@thi.ng/vectors/muln";
import { sub2 } from "@thi.ng/vectors/sub";

export type Complex = ReadonlyVec;

export type ComplexOpN = Fn<Complex, number>;

export type ComplexOp1 = Fn<Complex, Complex>;

export type ComplexOp2 = Fn2<Complex, Complex | number, Complex>;

/**
 * Complex `i` aka [0, 1]
 */
export const I: Complex = Object.freeze([0, 1]);

/**
 * Same as 1/i, i.e. [0, -1]
 */
export const J: Complex = Object.freeze([0, -1]);

export const ZERO: Complex = Object.freeze([0, 0]);
export const ONE: Complex = Object.freeze([1, 0]);
export const INF: Complex = Object.freeze([Infinity, Infinity]);

export const PI: Complex = Object.freeze([Math.PI, 0]);
export const E: Complex = Object.freeze([Math.E, 0]);

export const isZero: Predicate<Complex> = (a) => eq(ZERO, a);

export const isInfinite: Predicate<Complex> = (a) => eq(INF, a);

/**
 * Absolute value (magnitude) of a complex number.
 *
 * @remarks
 * Also see {@link norm}.
 *
 * @param a -
 */
export const abs: ComplexOpN = (a) => Math.sqrt(norm(a));

/**
 * Complex arccosine.
 *
 * @remarks
 * https://www.planetmath.org/complexsineandcosine
 *
 * @param a -
 */
export const acos: ComplexOp1 = (a) =>
	mul(J, log(add(a, mul(I, sqrt(sub(ONE, sq(a)))))));

/**
 * Complex hyperbolic arccosine.
 *
 * @remarks
 * http://scipp.ucsc.edu/~haber/archives/physics116A10/arc_10.pdf
 *
 * @param a -
 */
export const acosh: ComplexOp1 = (a) => {
	const [r, i] = acos(a);
	return i > 0 ? [i, -r] : [-i, r];
};

/**
 * Complex arccotangent.
 *
 * @remarks
 * http://scipp.ucsc.edu/~haber/archives/physics116A10/arc_10.pdf
 *
 * @param a -
 */
export const acot: ComplexOp1 = ([r, i]) =>
	mul([0, -0.5], log(div([r, i + 1], [r, i - 1])));

/**
 * Complex hyperbolic arccotangent.
 *
 * @remarks
 * http://scipp.ucsc.edu/~haber/archives/physics116A10/arc_10.pdf
 *
 * @param a -
 */
export const acoth: ComplexOp1 = ([r, i]) =>
	mul(log(div([r + 1, i], [r - 1, i])), 0.5);

/**
 * Complex addition. Operand `b` can be real or complex.
 *
 * @param a -
 * @param b -
 */
export const add: ComplexOp2 = (a, b) =>
	isNumber(b) ? [a[0] + b, a[1]] : add2([], a, b);

/**
 * Returns the argument/angle of a complex number, i.e. atan2(im,re)
 *
 * @remarks
 * Also see {@link abs}
 *
 * @param a -
 */
export const arg: ComplexOpN = (a) => Math.atan2(a[1], a[0]);

/**
 * Complex arcsine.
 *
 * @remarks
 * https://www.planetmath.org/complexsineandcosine
 *
 * @param a -
 */
export const asin: ComplexOp1 = (a) =>
	mul(J, log(add([-a[1], a[0]], sqrt(sub(ONE, sq(a))))));

/**
 * Complex hyperbolic arcsine.
 *
 * @remarks
 * http://scipp.ucsc.edu/~haber/archives/physics116A10/arc_10.pdf
 *
 * @param a -
 */
export const asinh: ComplexOp1 = ([r, i]) => mul(I, asin([i, -r]));

/**
 * Complex arctangent.
 *
 * @remarks
 * http://scipp.ucsc.edu/~haber/archives/physics116A10/arc_10.pdf
 *
 * @param a -
 */
export const atan: ComplexOp1 = ([r, i]) =>
	mul([0, -0.5], log(div([-r, 1 - i], [r, i + 1])));

/**
 * Complex hyperbolic arctangent.
 *
 * @remarks
 * http://scipp.ucsc.edu/~haber/archives/physics116A10/arc_10.pdf
 *
 * @param a -
 */
export const atanh: ComplexOp1 = ([r, i]) =>
	mul(log(div([1 + r, i], [1 - r, -i])), 0.5);

/**
 * Complex number conjugation.
 *
 * @param a -
 */
export const conjugate: ComplexOp1 = (a) => [a[0], -a[1]];

/**
 * Complex cosine.
 *
 * @remarks
 * https://www.planetmath.org/complexsineandcosine
 *
 * @param a -
 */
export const cos: ComplexOp1 = ([r, i]) =>
	divN2(null, add(exp([-i, r]), exp([i, -r])), 2);

/**
 * Complex hyperbolic cosine.
 *
 * @remarks
 * http://scipp.ucsc.edu/~haber/archives/physics116A10/arc_10.pdf
 *
 * @param a -
 */
export const cosh: ComplexOp1 = (a) => mul(add(exp(a), exp(neg(a))), 0.5);

/**
 * Complex cotangent.
 *
 * @remarks
 * https://www.planetmath.org/ComplexTangentAndCotangent
 *
 * @param a -
 */
export const cot: ComplexOp1 = ([r, i]) => {
	const e1 = exp([-i, r]);
	const e2 = exp([i, -r]);
	const b = submN2([], e1, e2, 0.5);
	return div(addmN2([], e1, e2, 0.5), [b[1], -b[0]]);
};

/**
 * Complex hyperbolic cotangent.
 *
 * @remarks
 * http://scipp.ucsc.edu/~haber/archives/physics116A10/arc_10.pdf
 *
 * @param a -
 */
export const coth: ComplexOp1 = (a) => {
	const [er, ei] = exp(mulN2([], a, 2));
	return div([er + 1, ei], [er - 1, ei]);
};

/**
 * Complex number division. Operand `b` can be real or complex.
 *
 * @param a -
 * @param b -
 */
export const div: ComplexOp2 = (a, b) => {
	if (isNumber(b)) return divN2([], a, b);
	const d = norm(b);
	return d !== 0
		? [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]
		: INF;
};

export const eq: Predicate2<Complex> = equals2;

export const eqDelta: (a: Complex, b: Complex, eps?: number) => boolean =
	eqDelta2;

/**
 * Returns e (the base of natural logarithms) raised to a complex power.
 *
 * @remarks
 * https://planetmath.org/ComplexExponentialFunction
 *
 * @param a -
 */
export const exp: ComplexOp1 = (a) => cossin(a[1], Math.exp(a[0]));

/**
 * Complex number inversion, i.e. returns 1 / z
 *
 * @param a
 */
export const inv: ComplexOp1 = (a) =>
	isZero(a) ? INF : isInfinite(a) ? ZERO : div(ONE, a);

/**
 * Complex number (natural) logarithm.
 *
 * @param a -
 */
export const log: ComplexOp1 = (a) => [Math.log(abs(a)), arg(a)];

/**
 * Combined multiply-add: `a * b + c`. The `b` param can be a real number.
 *
 * @param a
 * @param b
 * @param c
 */
export const madd = (a: Complex, b: Complex | number, c: Complex): Complex =>
	isNumber(b)
		? maddN2([], a, b, c)
		: [a[0] * b[0] - a[1] * b[1] + c[0], a[0] * b[1] + a[1] * b[0] + c[1]];

/**
 * Complex number multiplication. Operand `b` can be real or complex.
 *
 * @param a -
 * @param b -
 */
export const mul: ComplexOp2 = (a, b) =>
	isNumber(b)
		? mulN2([], a, b)
		: [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];

export const neg: ComplexOp1 = (a) => [-a[0], -a[1]];

/**
 * Squared magnitude of a complex number
 *
 * @param a -
 */
export const norm: ComplexOpN = magSq2;

/**
 * Converts complex number from given polar representation.
 *
 * @remarks
 * See {@link abs}, {@link arg} and {@link toPolar}.
 *
 * @param a -
 */
export const fromPolar: ComplexOp1 = (a) => cartesian2([], a);

/**
 * Converts complex number to its polar representation (abs, arg)
 *
 * @remarks
 * See {@link abs}, {@link arg} and {@link fromPolar}.
 *
 * @param a -
 */
export const toPolar: ComplexOp1 = (a) => [abs(a), arg(a)];

/**
 * Complex number exponentiation. Exponent can be real or complex.
 *
 * @param a -
 * @param b -
 */
export const pow: ComplexOp2 = (a, b) => exp(mul(log(a), b));

/**
 * Complex sine.
 *
 * @remarks
 * https://www.planetmath.org/complexsineandcosine
 *
 * @param a -
 */
export const sin: ComplexOp1 = ([r, i]) =>
	div(sub(exp([-i, r]), exp([i, -r])), [0, 2]);

/**
 * Complex hyperbolic sine.
 *
 * @remarks
 * http://scipp.ucsc.edu/~haber/archives/physics116A10/arc_10.pdf
 *
 * @param a -
 */
export const sinh: ComplexOp1 = (a) => mul(sub(exp(a), exp(neg(a))), 0.5);

/**
 * Complex square, i.e. same as `mul(a, a)`.
 *
 * @param a
 */
export const sq: ComplexOp1 = (a) => mul(a, a);

/**
 * Complex (principal) square root, i.e.
 * `(sqrt((abs(z)+re(z))/2), sign(im(z))*sqrt((abs(z)-re(z))/2))`
 *
 * @remarks
 * https://en.wikipedia.org/wiki/Square_root#Algebraic_formula
 *
 * @param a -
 */
export const sqrt: ComplexOp1 = (a) => {
	const mag = abs(a);
	return [
		Math.sqrt((mag + a[0]) / 2),
		Math.sign(a[1]) * Math.sqrt((mag - a[0]) / 2),
	];
};

/**
 * Complex number subtraction. Operand `b` can be real or complex.
 *
 * @param a -
 * @param b -
 */
export const sub: ComplexOp2 = (a, b) =>
	isNumber(b) ? [a[0] - b, a[1]] : sub2([], a, b);

/**
 * Complex tangent.
 *
 * @remarks
 * https://www.planetmath.org/ComplexTangentAndCotangent
 *
 * @param a -
 */
export const tan: ComplexOp1 = ([r, i]) => {
	const e1 = exp([-i, r]);
	const e2 = exp([i, -r]);
	const a = submN2([], e1, e2, 0.5);
	const b = addmN2([], e1, e2, 0.5);
	// div(sin(a),cos(a))
	return div([a[1], -a[0]], [b[0], b[1]]);
};

/**
 * Complex hyperbolic tangent.
 *
 * @remarks
 * http://scipp.ucsc.edu/~haber/archives/physics116A10/arc_10.pdf
 *
 * @param a -
 */
export const tanh: ComplexOp1 = (a) => {
	const [er, ei] = exp(mulN2([], a, 2));
	return div([er - 1, ei], [er + 1, ei]);
};
