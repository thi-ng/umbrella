import { abs2 } from "@thi.ng/vectors/abs";
import { acos2 } from "@thi.ng/vectors/acos";
import { add2 } from "@thi.ng/vectors/add";
import { addN2 } from "@thi.ng/vectors/addn";
import { ZERO2 } from "@thi.ng/vectors/api";
import { asin2 } from "@thi.ng/vectors/asin";
import { atan2, atan_22 } from "@thi.ng/vectors/atan";
import { ceil2 } from "@thi.ng/vectors/ceil";
import { clamp2 } from "@thi.ng/vectors/clamp";
import { cos2 } from "@thi.ng/vectors/cos";
import { degrees2 } from "@thi.ng/vectors/degrees";
import { dist } from "@thi.ng/vectors/dist";
import { div2 } from "@thi.ng/vectors/div";
import { divN2 } from "@thi.ng/vectors/divn";
import { dot2 } from "@thi.ng/vectors/dot";
import { eq2 } from "@thi.ng/vectors/eq";
import { exp2 } from "@thi.ng/vectors/exp";
import { exp_22 } from "@thi.ng/vectors/exp_2";
import { faceForward } from "@thi.ng/vectors/face-forward";
import { floor2 } from "@thi.ng/vectors/floor";
import { fract2 } from "@thi.ng/vectors/fract";
import { gt2 } from "@thi.ng/vectors/gt";
import { gte2 } from "@thi.ng/vectors/gte";
import { invSqrt2 } from "@thi.ng/vectors/invsqrt";
import { log2 } from "@thi.ng/vectors/log";
import { log_22 } from "@thi.ng/vectors/log_2";
import { lt2 } from "@thi.ng/vectors/lt";
import { lte2 } from "@thi.ng/vectors/lte";
import { mag } from "@thi.ng/vectors/mag";
import { max2 } from "@thi.ng/vectors/max";
import { min2 } from "@thi.ng/vectors/min";
import { mix2 } from "@thi.ng/vectors/mix";
import { mixN2 } from "@thi.ng/vectors/mixn";
import { mod2 } from "@thi.ng/vectors/mod";
import { modN2 } from "@thi.ng/vectors/modn";
import { mul2 } from "@thi.ng/vectors/mul";
import { mulN2 } from "@thi.ng/vectors/muln";
import { neg } from "@thi.ng/vectors/neg";
import { neq2 } from "@thi.ng/vectors/neq";
import { normalize2 } from "@thi.ng/vectors/normalize";
import { pow2 } from "@thi.ng/vectors/pow";
import { radians2 } from "@thi.ng/vectors/radians";
import { reflect } from "@thi.ng/vectors/reflect";
import { refract } from "@thi.ng/vectors/refract";
import { sign2 } from "@thi.ng/vectors/sign";
import { sin2 } from "@thi.ng/vectors/sin";
import { smoothStep2 } from "@thi.ng/vectors/smoothstep";
import { sqrt2 } from "@thi.ng/vectors/sqrt";
import { step2 } from "@thi.ng/vectors/step";
import { sub2 } from "@thi.ng/vectors/sub";
import { subN2 } from "@thi.ng/vectors/subn";
import { tan2 } from "@thi.ng/vectors/tan";
import type { JSBuiltinsVec } from "../api.js";
import { Pool } from "../pool.js";

export const VEC2 = ({ next, uniform }: Pool): JSBuiltinsVec => ({
	abs: (a) => abs2(next(), a),
	acos: (a) => acos2(next(), a),
	add: (a, b) => add2(next(), a, b),
	addnv: (a, b) => addN2(next(), b, a),
	addvn: (a, b) => addN2(next(), a, b),
	asin: (a) => asin2(next(), a),
	atan: (a) => atan2(next(), a),
	atannn: (a, b) => atan_22(next(), a, b),
	ceil: (a) => ceil2(next(), a),
	clamp: (x, a, b) => clamp2(next(), x, a, b),
	cos: (a) => cos2(next(), a),
	dec: (a) => subN2(next(), a, 1),
	degrees: (a) => degrees2(next(), a),
	dFdx: () => ZERO2,
	dFdy: () => ZERO2,
	distance: dist,
	div: (a, b) => div2(next(), a, b),
	divnv: (a, b) => div2(null, uniform(a), b),
	divvn: (a, b) => divN2(next(), a, b),
	dot: (a, b) => dot2(a, b),
	exp: (a) => exp2(next(), a),
	exp2: (a) => exp_22(next(), a),
	faceForward: (a, b, c) => faceForward(next(), a, b, c),
	floor: (a) => floor2(next(), a),
	fract: (a) => fract2(next(), a),
	fwidth: () => ZERO2,
	inc: (a) => addN2(next(), a, 1),
	inversesqrt: (a) => invSqrt2(next(), a),
	length: mag,
	log: (a) => log2(next(), a),
	log2: (a) => log_22(next(), a),
	max: (a, b) => max2(next(), a, b),
	min: (a, b) => min2(next(), a, b),
	mix: (a, b, t) => mix2(next(), a, b, t),
	mixn: (a, b, t) => mixN2(next(), a, b, t),
	mod: (a, b) => mod2(next(), a, b),
	modn: (a, b) => modN2(next(), a, b),
	mul: (a, b) => mul2(next(), a, b),
	mulnv: (a, b) => mulN2(next(), b, a),
	mulvn: (a, b) => mulN2(next(), a, b),
	normalize: (a) => normalize2(next(), a),
	pow: (a, b) => pow2(next(), a, b),
	radians: (a) => radians2(next(), a),
	reflect: (a, b) => reflect(next(), a, b),
	refract: (a, b, c) => refract(next(), a, b, c),
	sign: (a) => sign2(next(), a),
	sin: (a) => sin2(next(), a),
	smoothstep: (a, b, t) => smoothStep2(next(), a, b, t),
	sqrt: (a) => sqrt2(next(), a),
	step: (a, b) => step2(next(), a, b),
	sub: (a, b) => sub2(next(), a, b),
	sub1: (a) => neg(next(), a),
	subnv: (a, b) => sub2(null, uniform(a), b),
	subvn: (a, b) => subN2(next(), a, b),
	tan: (a) => tan2(next(), a),

	equal: (a, b) => eq2([], a, b),
	notEqual: (a, b) => neq2([], a, b),
	greaterThan: (a, b) => gt2([], a, b),
	lessThan: (a, b) => lt2([], a, b),
	greaterThanEqual: (a, b) => gte2([], a, b),
	lessThanEqual: (a, b) => lte2([], a, b),
});
