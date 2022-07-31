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
import { VEC3 } from "./vec3.js";

export const IVEC3: JSBuiltinsIntVec = {
	...VEC3,
	add: (a, b) => addI3([], a, b),
	addvn: (a, b) => addNI3([], a, b),
	addnv: (a, b) => addNI3([], b, a),
	div: (a, b) => divI3([], a, b),
	divvn: (a, b) => divNI3([], a, b),
	divnv: (a, b) => divI3(null, [a, a, a], b),
	modi: (a, b) => fmod3([], a, b),
	modivn: (a, b) => fmodN3([], a, b),
	modinv: (a, b) => fmod3(null, [a, a, a], b),
	mul: (a, b) => mulI3([], a, b),
	mulvn: (a, b) => mulNI3([], a, b),
	mulnv: (a, b) => mulNI3([], b, a),
	sub: (a, b) => subI3([], a, b),
	subvn: (a, b) => subNI3([], a, b),
	subnv: (a, b) => subI3(null, [a, a, a], b),
	bitand: (a, b) => bitAndI3([], a, b),
	lshift: (a, b) => lshiftI3([], a, b),
	bitnot1: (a) => bitNotI3([], a),
	bitor: (a, b) => bitOrI3([], a, b),
	rshift: (a, b) => rshiftI3([], a, b),
	bitxor: (a, b) => bitXorI3([], a, b),
};
