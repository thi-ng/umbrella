import { addI2, addNI2 } from "@thi.ng/vectors/addi";
import { bitAndI2 } from "@thi.ng/vectors/bit-and";
import { bitNotI2 } from "@thi.ng/vectors/bit-not";
import { bitOrI2 } from "@thi.ng/vectors/bit-or";
import { bitXorI2 } from "@thi.ng/vectors/bit-xor";
import { divI2, divNI2 } from "@thi.ng/vectors/divi";
import { fmod2 } from "@thi.ng/vectors/fmod";
import { fmodN2 } from "@thi.ng/vectors/fmodn";
import { lshiftI2, lshiftNI2 } from "@thi.ng/vectors/lshift";
import { mulI2, mulNI2 } from "@thi.ng/vectors/muli";
import { rshiftI2, rshiftNI2 } from "@thi.ng/vectors/rshift";
import { subI2, subNI2 } from "@thi.ng/vectors/subi";
import type { JSBuiltinsIntVec } from "../api.js";
import { POOL_IVEC2 } from "../pool.js";
import { VEC2 } from "./vec2.js";

const { next, uniform } = POOL_IVEC2;

export const IVEC2: JSBuiltinsIntVec = {
	...VEC2(POOL_IVEC2),
	add: (a, b) => addI2(next(), a, b),
	addvn: (a, b) => addNI2(next(), a, b),
	addnv: (a, b) => addNI2(next(), b, a),
	div: (a, b) => divI2(next(), a, b),
	divvn: (a, b) => divNI2(next(), a, b),
	divnv: (a, b) => divI2(null, uniform(a), b),
	modi: (a, b) => fmod2(next(), a, b),
	modivn: (a, b) => fmodN2(next(), a, b),
	modinv: (a, b) => fmod2(null, uniform(a), b),
	mul: (a, b) => mulI2(next(), a, b),
	mulvn: (a, b) => mulNI2(next(), a, b),
	mulnv: (a, b) => mulNI2(next(), b, a),
	sub: (a, b) => subI2(next(), a, b),
	subvn: (a, b) => subNI2(next(), a, b),
	subnv: (a, b) => subI2(null, uniform(a), b),
	bitand: (a, b) => bitAndI2(next(), a, b),
	lshift: (a, b) => lshiftI2(next(), a, b),
	lshiftvn: (a, b) => lshiftNI2(next(), a, b),
	bitnot1: (a) => bitNotI2(next(), a),
	bitor: (a, b) => bitOrI2(next(), a, b),
	rshift: (a, b) => rshiftI2(next(), a, b),
	rshiftvn: (a, b) => rshiftNI2(next(), a, b),
	bitxor: (a, b) => bitXorI2(next(), a, b),
};
