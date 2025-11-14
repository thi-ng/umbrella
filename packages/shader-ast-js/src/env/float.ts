// SPDX-License-Identifier: Apache-2.0
import { deg, rad } from "@thi.ng/math/angle";
import { clamp } from "@thi.ng/math/interval";
import { mix } from "@thi.ng/math/mix";
import { fract, mod } from "@thi.ng/math/prec";
import { smoothStep, step } from "@thi.ng/math/step";
import type { JSBuiltinsFloat } from "../api.js";

export const FLOAT: JSBuiltinsFloat<number> = {
	abs: Math.abs,
	acos: Math.acos,
	acosh: Math.acosh,
	asin: Math.asin,
	asinh: Math.asinh,
	atan: Math.atan,
	atanh: Math.atanh,
	atannn: Math.atan2,
	ceil: Math.ceil,
	clamp,
	cos: Math.cos,
	cosh: Math.cosh,
	degrees: deg,
	dFdx: () => 0,
	dFdy: () => 0,
	exp: Math.exp,
	exp2: (x) => Math.pow(2, x),
	floor: Math.floor,
	fract,
	fwidth: () => 0,
	inversesqrt: (x) => 1 / Math.sqrt(x),
	log: Math.log,
	log2: Math.log2,
	max: Math.max,
	min: Math.min,
	mix,
	mixn: mix,
	mod,
	modn: mod,
	pow: Math.pow,
	radians: rad,
	sign: Math.sign,
	sin: Math.sin,
	sinh: Math.sinh,
	smoothstep: smoothStep,
	sqrt: Math.sqrt,
	step,
	tan: Math.tan,
	tanh: Math.tanh,
};
