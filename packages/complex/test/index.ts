import { eqDelta as $eq } from "@thi.ng/math";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
	abs,
	acos,
	acosh,
	acot,
	acoth,
	add,
	arg,
	asin,
	asinh,
	atan,
	atanh,
	conjugate,
	cos,
	cosh,
	cot,
	coth,
	div,
	eqDelta,
	exp,
	inv,
	log,
	mul,
	neg,
	norm,
	pow,
	sin,
	sinh,
	sqrt,
	sub,
	tan,
	tanh,
	type Complex,
	type ComplexOp1,
	type ComplexOp2,
	type ComplexOpN,
} from "../src/index.js";

const A = [3, 2];
const B = [0.5, -0.75];
const CASES: Complex[] = [A, B];
const EPS = 1e-3;

const checkN = (fn: ComplexOpN, res: number[]) => {
	CASES.forEach((x, i) =>
		assert.ok($eq(fn(x), res[i], EPS), `expected: ${res[i]}, got ${fn(x)}`)
	);
};

export const check1 = (fn: ComplexOp1, res: Complex[]) => {
	CASES.forEach((x, i) =>
		assert.ok(
			eqDelta(fn(x), res[i], EPS),
			`expected: ${res[i]}, got ${fn(x)}`
		)
	);
};

export const check2 = (
	fn: ComplexOp2,
	arg: Complex | number,
	res: Complex[]
) => {
	CASES.forEach((x, i) =>
		assert.ok(
			eqDelta(fn(x, arg), res[i], EPS),
			`expected: ${res[i]}, got ${fn(x, arg)}`
		)
	);
};

group(
	"complex",
	{
		abs: () => checkN(abs, [3.606, 0.901]),
		acos: () =>
			check1(acos, [
				[0.606, -1.969],
				[1.173, 0.743],
			]),
		acosh: () =>
			check1(acosh, [
				[1.968, 0.606],
				[0.743, -1.173],
			]),
		acot: () =>
			check1(acot, [
				[0.232, -0.147],
				[0.878, 0.59],
			]),
		acoth: () =>
			check1(acoth, [
				[0.229, -0.161],
				[0.31, 0.8475],
			]),
		add: () =>
			check2(
				add,
				[10, -20],
				[
					[13, -18],
					[10.5, -20.75],
				]
			),
		arg: () => checkN(arg, [0.588, -0.983]),
		asin: () =>
			check1(asin, [
				[0.965, 1.969],
				[0.398, -0.743],
			]),
		asinh: () =>
			check1(asinh, [
				[1.983, 0.571],
				[0.606, -0.682],
			]),
		atan: () =>
			check1(atan, [
				[1.339, 0.147],
				[0.693, -0.59],
			]),
		atanh: () =>
			check1(atanh, [
				[0.229, 1.41],
				[0.31, -0.723],
			]),
		conjugate: () =>
			check1(conjugate, [
				[3, -2],
				[0.5, 0.75],
			]),
		cos: () =>
			check1(cos, [
				[-3.725, -0.512],
				[1.136, 0.394],
			]),
		cosh: () =>
			check1(cosh, [
				[-4.1896, 9.109],
				[0.825, -0.355],
			]),
		cot: () =>
			check1(cot, [
				[-0.011, -1.036],
				[0.464, 1.175],
			]),
		coth: () =>
			check1(coth, [
				[0.997, 0.004],
				[0.798, 0.677],
			]),
		div: () =>
			check2(
				div,
				[10, -20],
				[
					[-0.02, 0.16],
					[0.04, 0.005],
				]
			),
		exp: () =>
			check1(exp, [
				[-8.359, 18.264],
				[1.206, -1.124],
			]),
		inv: () =>
			check1(inv, [
				[0.231, -0.154],
				[0.615, 0.923],
			]),
		log: () =>
			check1(log, [
				[1.282, 0.588],
				[-0.104, -0.983],
			]),
		mul: () =>
			check2(
				mul,
				[10, -20],
				[
					[70, -40],
					[-10, -17.5],
				]
			),
		neg: () =>
			check1(neg, [
				[-3, -2],
				[-0.5, 0.75],
			]),
		norm: () => checkN(norm, [3 * 3 + 2 * 2, 0.5 * 0.5 + 0.75 * 0.75]),
		pow: () =>
			check2(
				pow,
				[4, -5],
				[
					[-1939.824, 2541.011],
					[-0.0047, 0.0013],
				]
			),
		sin: () =>
			check1(sin, [
				[0.531, -3.591],
				[0.621, -0.722],
			]),
		sinh: () =>
			check1(sinh, [
				[-4.169, 9.154],
				[0.381, -0.769],
			]),
		sqrt: () =>
			check1(sqrt, [
				[1.817, 0.55],
				[0.837, -0.448],
			]),
		sub: () =>
			check2(
				sub,
				[10, -20],
				[
					[-7, 22],
					[-9.5, 19.25],
				]
			),
		tan: () =>
			check1(tan, [
				[-0.0098, 0.965],
				[0.291, -0.736],
			]),
		tanh: () => {
			check1(tanh, [
				[1.003, -0.004],
				[0.728, -0.618],
			]);
		},
	},
	{}
);
