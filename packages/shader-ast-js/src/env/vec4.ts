import { abs4 } from "@thi.ng/vectors/abs";
import { acos4 } from "@thi.ng/vectors/acos";
import { add4 } from "@thi.ng/vectors/add";
import { addN4 } from "@thi.ng/vectors/addn";
import { ZERO4 } from "@thi.ng/vectors/api";
import { asin4 } from "@thi.ng/vectors/asin";
import { atan4, atan_24 } from "@thi.ng/vectors/atan";
import { ceil4 } from "@thi.ng/vectors/ceil";
import { clamp4 } from "@thi.ng/vectors/clamp";
import { cos4 } from "@thi.ng/vectors/cos";
import { degrees4 } from "@thi.ng/vectors/degrees";
import { dist } from "@thi.ng/vectors/dist";
import { div4 } from "@thi.ng/vectors/div";
import { divN4 } from "@thi.ng/vectors/divn";
import { dot4 } from "@thi.ng/vectors/dot";
import { eq4 } from "@thi.ng/vectors/eq";
import { exp4 } from "@thi.ng/vectors/exp";
import { exp_24 } from "@thi.ng/vectors/exp_2";
import { faceForward } from "@thi.ng/vectors/face-forward";
import { floor4 } from "@thi.ng/vectors/floor";
import { fract4 } from "@thi.ng/vectors/fract";
import { gt4 } from "@thi.ng/vectors/gt";
import { gte4 } from "@thi.ng/vectors/gte";
import { invSqrt4 } from "@thi.ng/vectors/invsqrt";
import { log4 } from "@thi.ng/vectors/log";
import { log_24 } from "@thi.ng/vectors/log_2";
import { lt4 } from "@thi.ng/vectors/lt";
import { lte4 } from "@thi.ng/vectors/lte";
import { mag } from "@thi.ng/vectors/mag";
import { max4 } from "@thi.ng/vectors/max";
import { min4 } from "@thi.ng/vectors/min";
import { mix4 } from "@thi.ng/vectors/mix";
import { mixN4 } from "@thi.ng/vectors/mixn";
import { mod4 } from "@thi.ng/vectors/mod";
import { modN4 } from "@thi.ng/vectors/modn";
import { mul4 } from "@thi.ng/vectors/mul";
import { mulN4 } from "@thi.ng/vectors/muln";
import { neg } from "@thi.ng/vectors/neg";
import { neq4 } from "@thi.ng/vectors/neq";
import { normalize4 } from "@thi.ng/vectors/normalize";
import { pow4 } from "@thi.ng/vectors/pow";
import { radians4 } from "@thi.ng/vectors/radians";
import { reflect } from "@thi.ng/vectors/reflect";
import { refract } from "@thi.ng/vectors/refract";
import { sign4 } from "@thi.ng/vectors/sign";
import { sin4 } from "@thi.ng/vectors/sin";
import { smoothStep4 } from "@thi.ng/vectors/smoothstep";
import { sqrt4 } from "@thi.ng/vectors/sqrt";
import { step4 } from "@thi.ng/vectors/step";
import { sub4 } from "@thi.ng/vectors/sub";
import { subN4 } from "@thi.ng/vectors/subn";
import { tan4 } from "@thi.ng/vectors/tan";
import type { JSBuiltinsVec } from "../api.js";
import { Pool } from "../pool.js";

export const VEC4 = ({ next, uniform }: Pool): JSBuiltinsVec => ({
	abs: (a) => abs4(next(), a),
	acos: (a) => acos4(next(), a),
	add: (a, b) => add4(next(), a, b),
	addnv: (a, b) => addN4(next(), b, a),
	addvn: (a, b) => addN4(next(), a, b),
	asin: (a) => asin4(next(), a),
	atan: (a) => atan4(next(), a),
	atannn: (a, b) => atan_24(next(), a, b),
	ceil: (a) => ceil4(next(), a),
	clamp: (x, a, b) => clamp4(next(), x, a, b),
	cos: (a) => cos4(next(), a),
	dec: (a) => subN4(next(), a, 1),
	degrees: (a) => degrees4(next(), a),
	dFdx: () => ZERO4,
	dFdy: () => ZERO4,
	distance: dist,
	div: (a, b) => div4(next(), a, b),
	divnv: (a, b) => div4(null, uniform(a), b),
	divvn: (a, b) => divN4(next(), a, b),
	dot: (a, b) => dot4(a, b),
	exp: (a) => exp4(next(), a),
	exp2: (a) => exp_24(next(), a),
	faceForward: (a, b, c) => faceForward(next(), a, b, c),
	floor: (a) => floor4(next(), a),
	fract: (a) => fract4(next(), a),
	fwidth: () => ZERO4,
	inc: (a) => addN4(next(), a, 1),
	inversesqrt: (a) => invSqrt4(next(), a),
	length: mag,
	log: (a) => log4(next(), a),
	log2: (a) => log_24(next(), a),
	max: (a, b) => max4(next(), a, b),
	min: (a, b) => min4(next(), a, b),
	mix: (a, b, t) => mix4(next(), a, b, t),
	mixn: (a, b, t) => mixN4(next(), a, b, t),
	mod: (a, b) => mod4(next(), a, b),
	modn: (a, b) => modN4(next(), a, b),
	mul: (a, b) => mul4(next(), a, b),
	mulnv: (a, b) => mulN4(next(), b, a),
	mulvn: (a, b) => mulN4(next(), a, b),
	normalize: (a) => normalize4(next(), a),
	pow: (a, b) => pow4(next(), a, b),
	radians: (a) => radians4(next(), a),
	reflect: (a, b) => reflect(next(), a, b),
	refract: (a, b, c) => refract(next(), a, b, c),
	sign: (a) => sign4(next(), a),
	sin: (a) => sin4(next(), a),
	smoothstep: (a, b, t) => smoothStep4(next(), a, b, t),
	sqrt: (a) => sqrt4(next(), a),
	step: (a, b) => step4(next(), a, b),
	sub: (a, b) => sub4(next(), a, b),
	sub1: (a) => neg(next(), a),
	subnv: (a, b) => sub4(null, uniform(a), b),
	subvn: (a, b) => subN4(next(), a, b),
	tan: (a) => tan4(next(), a),

	equal: (a, b) => eq4([], a, b),
	notEqual: (a, b) => neq4([], a, b),
	greaterThan: (a, b) => gt4([], a, b),
	lessThan: (a, b) => lt4([], a, b),
	greaterThanEqual: (a, b) => gte4([], a, b),
	lessThanEqual: (a, b) => lte4([], a, b),
});
