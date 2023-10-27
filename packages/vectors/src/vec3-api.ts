import { abs3 } from "./abs.js";
import { acos3 } from "./acos.js";
import { add3 } from "./add.js";
import { addm3 } from "./addm.js";
import { addmN3 } from "./addmn.js";
import { addN3 } from "./addn.js";
import type { VecAPI } from "./api.js";
import { asin3 } from "./asin.js";
import { atan3, atan_23 } from "./atan.js";
import { ceil3 } from "./ceil.js";
import { clamp01_3, clamp3 } from "./clamp.js";
import { cos3 } from "./cos.js";
import { degrees3 } from "./degrees.js";
import { dist3 } from "./dist.js";
import { distSq3 } from "./distsq.js";
import { div3 } from "./div.js";
import { divN3 } from "./divn.js";
import { dot3 } from "./dot.js";
import { eq3 } from "./eq.js";
import { eqDelta3 } from "./eqdelta.js";
import { equals3 } from "./equals.js";
import { exp3 } from "./exp.js";
import { exp_23 } from "./exp_2.js";
import { fit01_3, fit3 } from "./fit.js";
import { floor3 } from "./floor.js";
import { fmod3 } from "./fmod.js";
import { fract3 } from "./fract.js";
import { gt3 } from "./gt.js";
import { gte3 } from "./gte.js";
import { invSqrt3 } from "./invsqrt.js";
import { limit3 } from "./limit.js";
import { log3 } from "./log.js";
import { log_23 } from "./log_2.js";
import { lt3 } from "./lt.js";
import { lte3 } from "./lte.js";
import { madd3 } from "./madd.js";
import { maddN3 } from "./maddn.js";
import { mag3 } from "./mag.js";
import { magSq3 } from "./magsq.js";
import { major3 } from "./major.js";
import { max3 } from "./max.js";
import { min3 } from "./min.js";
import { minor3 } from "./minor.js";
import { mix3 } from "./mix.js";
import { mixN3 } from "./mixn.js";
import { mod3 } from "./mod.js";
import { modN3 } from "./modn.js";
import { msub3 } from "./msub.js";
import { msubN3 } from "./msubn.js";
import { mul3 } from "./mul.js";
import { mulN3 } from "./muln.js";
import { neq3 } from "./neq.js";
import { normalize3 } from "./normalize.js";
import { pow3 } from "./pow.js";
import { powN3 } from "./pown.js";
import { radians3 } from "./radians.js";
import {
	randMinMax3,
	randNorm3,
	randNormDistrib3,
	random3,
	randomDistrib3,
} from "./random.js";
import { round3 } from "./round.js";
import { set3 } from "./set.js";
import { setN3 } from "./setn.js";
import { sign3 } from "./sign.js";
import { sin3 } from "./sin.js";
import { smoothStep3 } from "./smoothstep.js";
import { sqrt3 } from "./sqrt.js";
import { step3 } from "./step.js";
import { sub3 } from "./sub.js";
import { subm3 } from "./subm.js";
import { submN3 } from "./submn.js";
import { subN3 } from "./subn.js";
import { tan3 } from "./tan.js";
import { trunc3 } from "./trunc.js";

export const VEC3: VecAPI = {
	abs: abs3,
	acos: acos3,
	add: add3,
	addN: addN3,
	addm: addm3,
	addmN: addmN3,
	asin: asin3,
	atan: atan3,
	atan2: atan_23,
	ceil: ceil3,
	clamp: clamp3,
	clamp01: clamp01_3,
	cos: cos3,
	degrees: degrees3,
	dist: dist3,
	distSq: distSq3,
	div: div3,
	divN: divN3,
	dot: dot3,
	eqDelta: eqDelta3,
	equals: equals3,
	exp: exp3,
	exp2: exp_23,
	fit: fit3,
	fit01: fit01_3,
	floor: floor3,
	fmod: fmod3,
	fract: fract3,
	invSqrt: invSqrt3,
	madd: madd3,
	maddN: maddN3,
	mag: mag3,
	magSq: magSq3,
	limit: limit3,
	log: log3,
	log2: log_23,
	major: major3,
	max: max3,
	min: min3,
	minor: minor3,
	mix: mix3,
	mixN: mixN3,
	mod: mod3,
	modN: modN3,
	msub: msub3,
	msubN: msubN3,
	mul: mul3,
	mulN: mulN3,
	normalize: normalize3,
	pow: pow3,
	powN: powN3,
	radians: radians3,
	random: random3,
	randomDistrib: randomDistrib3,
	randMinMax: randMinMax3,
	randNorm: randNorm3,
	randNormDistrib: randNormDistrib3,
	round: round3,
	set: set3,
	setN: setN3,
	sign: sign3,
	sin: sin3,
	smoothstep: smoothStep3,
	sqrt: sqrt3,
	step: step3,
	sub: sub3,
	subN: subN3,
	subm: subm3,
	submN: submN3,
	tan: tan3,
	trunc: trunc3,

	eq: eq3,
	neq: neq3,
	gt: gt3,
	gte: gte3,
	lt: lt3,
	lte: lte3,
};
