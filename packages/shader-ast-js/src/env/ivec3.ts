import { addI3, addNI3 } from "@thi.ng/vectors/addi";
import { bitAndI3 } from "@thi.ng/vectors/bit-and";
import { bitNotI3 } from "@thi.ng/vectors/bit-not";
import { bitOrI3 } from "@thi.ng/vectors/bit-or";
import { bitXorI3 } from "@thi.ng/vectors/bit-xor";
import { divI3, divNI3 } from "@thi.ng/vectors/divi";
import { fmod3 } from "@thi.ng/vectors/fmod";
import { fmodN3 } from "@thi.ng/vectors/fmodn";
import { lshiftI3 } from "@thi.ng/vectors/lshift";
import { mulI3, mulNI3 } from "@thi.ng/vectors/muli";
import { rshiftI3 } from "@thi.ng/vectors/rshift";
import { subI3, subNI3 } from "@thi.ng/vectors/subi";
import type { JSBuiltinsIntVec } from "../api.js";
import { POOL_IVEC3 } from "../pool.js";
import { VEC3 } from "./vec3.js";

const { next, uniform } = POOL_IVEC3;

export const IVEC3: JSBuiltinsIntVec = {
	...VEC3(POOL_IVEC3),
	add: (a, b) => addI3(next(), a, b),
	addvn: (a, b) => addNI3(next(), a, b),
	addnv: (a, b) => addNI3(next(), b, a),
	div: (a, b) => divI3(next(), a, b),
	divvn: (a, b) => divNI3(next(), a, b),
	divnv: (a, b) => divI3(null, uniform(a), b),
	modi: (a, b) => fmod3(next(), a, b),
	modivn: (a, b) => fmodN3(next(), a, b),
	modinv: (a, b) => fmod3(null, uniform(a), b),
	mul: (a, b) => mulI3(next(), a, b),
	mulvn: (a, b) => mulNI3(next(), a, b),
	mulnv: (a, b) => mulNI3(next(), b, a),
	sub: (a, b) => subI3(next(), a, b),
	subvn: (a, b) => subNI3(next(), a, b),
	subnv: (a, b) => subI3(null, uniform(a), b),
	bitand: (a, b) => bitAndI3(next(), a, b),
	lshift: (a, b) => lshiftI3(next(), a, b),
	bitnot1: (a) => bitNotI3(next(), a),
	bitor: (a, b) => bitOrI3(next(), a, b),
	rshift: (a, b) => rshiftI3(next(), a, b),
	bitxor: (a, b) => bitXorI3(next(), a, b),
};
