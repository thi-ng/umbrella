// SPDX-License-Identifier: Apache-2.0
import { abs4 } from "./abs.js";
import { acos4 } from "./acos.js";
import { add4 } from "./add.js";
import { addm4 } from "./addm.js";
import { addmN4 } from "./addmn.js";
import { addN4 } from "./addn.js";
import { ONE4, ZERO4, type VecAPI } from "./api.js";
import { asin4 } from "./asin.js";
import { atan_4 } from "./atan.js";
import { atan2_4 } from "./atan2.js";
import { ceil4 } from "./ceil.js";
import { clamp4 } from "./clamp.js";
import { clampN4 } from "./clampn.js";
import { clamp01_4 } from "./clamp01.js";
import { cos4 } from "./cos.js";
import { degrees4 } from "./degrees.js";
import { dist4 } from "./dist.js";
import { distSq4 } from "./distsq.js";
import { div4 } from "./div.js";
import { divN4 } from "./divn.js";
import { dot4 } from "./dot.js";
import { eq4 } from "./eq.js";
import { eqDelta4 } from "./eqdelta.js";
import { equals4 } from "./equals.js";
import { exp_4 } from "./exp.js";
import { exp2_4 } from "./exp2.js";
import { fit4 } from "./fit.js";
import { fit01_4 } from "./fit01.js";
import { floor4 } from "./floor.js";
import { fmod4 } from "./fmod.js";
import { fract4 } from "./fract.js";
import { gt4 } from "./gt.js";
import { gte4 } from "./gte.js";
import { invSqrt4 } from "./invsqrt.js";
import { limit4 } from "./limit.js";
import { log_4 } from "./log.js";
import { log2_4 } from "./log2.js";
import { lt4 } from "./lt.js";
import { lte4 } from "./lte.js";
import { madd4 } from "./madd.js";
import { maddN4 } from "./maddn.js";
import { mag4 } from "./mag.js";
import { magSq4 } from "./magsq.js";
import { major4 } from "./major.js";
import { max4 } from "./max.js";
import { min4 } from "./min.js";
import { minor4 } from "./minor.js";
import { mix4 } from "./mix.js";
import { mixN4 } from "./mixn.js";
import { mod4 } from "./mod.js";
import { modN4 } from "./modn.js";
import { msub4 } from "./msub.js";
import { msubN4 } from "./msubn.js";
import { mul4 } from "./mul.js";
import { mulN4 } from "./muln.js";
import { neq4 } from "./neq.js";
import { normalize4 } from "./normalize.js";
import { pow4 } from "./pow.js";
import { powN4 } from "./pown.js";
import { radians4 } from "./radians.js";
import { randDistrib4 } from "./rand-distrib.js";
import { randMinMax4 } from "./rand-minmax.js";
import { randNorm4 } from "./rand-norm.js";
import { randNormDistrib4 } from "./rand-normdistrib.js";
import { random4 } from "./random.js";
import { round4 } from "./round.js";
import { set4 } from "./set.js";
import { ones, setN4, zeroes } from "./setn.js";
import { sign4 } from "./sign.js";
import { sin4 } from "./sin.js";
import { smoothStep4 } from "./smoothstep.js";
import { sqrt4 } from "./sqrt.js";
import { step4 } from "./step.js";
import { sub4 } from "./sub.js";
import { subm4 } from "./subm.js";
import { submN4 } from "./submn.js";
import { subN4 } from "./subn.js";
import { tan4 } from "./tan.js";
import { trunc4 } from "./trunc.js";

export const VEC4: VecAPI = {
	ZERO: ZERO4,
	ONE: ONE4,

	zeroes: () => zeroes(4),
	ones: () => ones(4),

	abs: abs4,
	acos: acos4,
	add: add4,
	addN: addN4,
	addm: addm4,
	addmN: addmN4,
	asin: asin4,
	atan: atan_4,
	atan2: atan2_4,
	ceil: ceil4,
	clamp: clamp4,
	clampN: clampN4,
	clamp01: clamp01_4,
	cos: cos4,
	degrees: degrees4,
	dist: dist4,
	distSq: distSq4,
	div: div4,
	divN: divN4,
	dot: dot4,
	eqDelta: eqDelta4,
	equals: equals4,
	exp: exp_4,
	exp2: exp2_4,
	fit: fit4,
	fit01: fit01_4,
	floor: floor4,
	fmod: fmod4,
	fract: fract4,
	invSqrt: invSqrt4,
	madd: madd4,
	maddN: maddN4,
	mag: mag4,
	magSq: magSq4,
	limit: limit4,
	log: log_4,
	log2: log2_4,
	major: major4,
	max: max4,
	min: min4,
	minor: minor4,
	mix: mix4,
	mixN: mixN4,
	mod: mod4,
	modN: modN4,
	msub: msub4,
	msubN: msubN4,
	mul: mul4,
	mulN: mulN4,
	normalize: normalize4,
	pow: pow4,
	powN: powN4,
	radians: radians4,
	random: random4,
	randomDistrib: randDistrib4,
	randMinMax: randMinMax4,
	randNorm: randNorm4,
	randNormDistrib: randNormDistrib4,
	round: round4,
	set: set4,
	setN: setN4,
	sign: sign4,
	sin: sin4,
	smoothstep: smoothStep4,
	sqrt: sqrt4,
	step: step4,
	sub: sub4,
	subN: subN4,
	subm: subm4,
	submN: submN4,
	tan: tan4,
	trunc: trunc4,

	eq: eq4,
	neq: neq4,
	gt: gt4,
	gte: gte4,
	lt: lt4,
	lte: lte4,
};
