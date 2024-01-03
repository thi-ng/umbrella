import { abs2 } from "./abs.js";
import { acos2 } from "./acos.js";
import { add2 } from "./add.js";
import { addm2 } from "./addm.js";
import { addmN2 } from "./addmn.js";
import { addN2 } from "./addn.js";
import { ONE2, ZERO2, type VecAPI } from "./api.js";
import { asin2 } from "./asin.js";
import { atan2, atan_22 } from "./atan.js";
import { ceil2 } from "./ceil.js";
import { clamp01_2, clamp2 } from "./clamp.js";
import { cos2 } from "./cos.js";
import { degrees2 } from "./degrees.js";
import { dist2 } from "./dist.js";
import { distSq2 } from "./distsq.js";
import { div2 } from "./div.js";
import { divN2 } from "./divn.js";
import { dot2 } from "./dot.js";
import { eq2 } from "./eq.js";
import { eqDelta2 } from "./eqdelta.js";
import { equals2 } from "./equals.js";
import { exp2 } from "./exp.js";
import { exp_22 } from "./exp_2.js";
import { fit01_2, fit2 } from "./fit.js";
import { floor2 } from "./floor.js";
import { fmod2 } from "./fmod.js";
import { fract2 } from "./fract.js";
import { gt2 } from "./gt.js";
import { gte2 } from "./gte.js";
import { invSqrt2 } from "./invsqrt.js";
import { limit2 } from "./limit.js";
import { log2 } from "./log.js";
import { log_22 } from "./log_2.js";
import { lt2 } from "./lt.js";
import { lte2 } from "./lte.js";
import { madd2 } from "./madd.js";
import { maddN2 } from "./maddn.js";
import { mag2 } from "./mag.js";
import { magSq2 } from "./magsq.js";
import { major2 } from "./major.js";
import { max2 } from "./max.js";
import { min2 } from "./min.js";
import { minor2 } from "./minor.js";
import { mix2 } from "./mix.js";
import { mixN2 } from "./mixn.js";
import { mod2 } from "./mod.js";
import { modN2 } from "./modn.js";
import { msub2 } from "./msub.js";
import { msubN2 } from "./msubn.js";
import { mul2 } from "./mul.js";
import { mulN2 } from "./muln.js";
import { neq2 } from "./neq.js";
import { normalize2 } from "./normalize.js";
import { pow2 } from "./pow.js";
import { powN2 } from "./pown.js";
import { radians2 } from "./radians.js";
import { randDistrib2 } from "./rand-distrib.js";
import { randMinMax2 } from "./rand-minmax.js";
import { randNorm2 } from "./rand-norm.js";
import { randNormDistrib2 } from "./rand-normdistrib.js";
import { random2 } from "./random.js";
import { round2 } from "./round.js";
import { set2 } from "./set.js";
import { ones, setN2, zeroes } from "./setn.js";
import { sign2 } from "./sign.js";
import { sin2 } from "./sin.js";
import { smoothStep2 } from "./smoothstep.js";
import { sqrt2 } from "./sqrt.js";
import { step2 } from "./step.js";
import { sub2 } from "./sub.js";
import { subm2 } from "./subm.js";
import { submN2 } from "./submn.js";
import { subN2 } from "./subn.js";
import { tan2 } from "./tan.js";
import { trunc2 } from "./trunc.js";

export const VEC2: VecAPI = {
	ZERO: ZERO2,
	ONE: ONE2,

	zeroes: () => zeroes(2),
	ones: () => ones(2),

	abs: abs2,
	acos: acos2,
	add: add2,
	addN: addN2,
	addm: addm2,
	addmN: addmN2,
	asin: asin2,
	atan: atan2,
	atan2: atan_22,
	ceil: ceil2,
	clamp: clamp2,
	clamp01: clamp01_2,
	cos: cos2,
	degrees: degrees2,
	dist: dist2,
	distSq: distSq2,
	div: div2,
	divN: divN2,
	dot: dot2,
	eqDelta: eqDelta2,
	equals: equals2,
	exp: exp2,
	exp2: exp_22,
	fit: fit2,
	fit01: fit01_2,
	floor: floor2,
	fmod: fmod2,
	fract: fract2,
	invSqrt: invSqrt2,
	madd: madd2,
	maddN: maddN2,
	mag: mag2,
	magSq: magSq2,
	limit: limit2,
	log: log2,
	log2: log_22,
	major: major2,
	max: max2,
	min: min2,
	minor: minor2,
	mix: mix2,
	mixN: mixN2,
	mod: mod2,
	modN: modN2,
	msub: msub2,
	msubN: msubN2,
	mul: mul2,
	mulN: mulN2,
	normalize: normalize2,
	pow: pow2,
	powN: powN2,
	radians: radians2,
	random: random2,
	randomDistrib: randDistrib2,
	randMinMax: randMinMax2,
	randNorm: randNorm2,
	randNormDistrib: randNormDistrib2,
	round: round2,
	set: set2,
	setN: setN2,
	sign: sign2,
	sin: sin2,
	smoothstep: smoothStep2,
	sqrt: sqrt2,
	step: step2,
	sub: sub2,
	subN: subN2,
	subm: subm2,
	submN: submN2,
	tan: tan2,
	trunc: trunc2,

	eq: eq2,
	neq: neq2,
	gt: gt2,
	gte: gte2,
	lt: lt2,
	lte: lte2,
};
