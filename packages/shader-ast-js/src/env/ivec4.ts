// SPDX-License-Identifier: Apache-2.0
import { addI4 } from "@thi.ng/vectors/addi";
import { addNI4 } from "@thi.ng/vectors/addni";
import { bitAndI4 } from "@thi.ng/vectors/bit-andi";
import { bitNotI4 } from "@thi.ng/vectors/bit-noti";
import { bitOrI4 } from "@thi.ng/vectors/bit-ori";
import { bitXorI4 } from "@thi.ng/vectors/bit-xori";
import { divI4 } from "@thi.ng/vectors/divi";
import { divNI4 } from "@thi.ng/vectors/divni";
import { fmod4 } from "@thi.ng/vectors/fmod";
import { fmodN4 } from "@thi.ng/vectors/fmodn";
import { lshiftI4 } from "@thi.ng/vectors/lshifti";
import { lshiftNI4 } from "@thi.ng/vectors/lshiftni";
import { mulI4 } from "@thi.ng/vectors/muli";
import { mulNI4 } from "@thi.ng/vectors/mulni";
import { rshiftI4 } from "@thi.ng/vectors/rshifti";
import { rshiftNI4 } from "@thi.ng/vectors/rshiftni";
import { subI4 } from "@thi.ng/vectors/subi";
import { subNI4 } from "@thi.ng/vectors/subni";
import type { JSBuiltinsIntVec } from "../api.js";
import { POOL_IVEC4 } from "../pool.js";
import { VEC4 } from "./vec4.js";

const { next, uniform } = POOL_IVEC4;

export const IVEC4: JSBuiltinsIntVec = {
	...VEC4(POOL_IVEC4),
	add: (a, b) => addI4(next(), a, b),
	addvn: (a, b) => addNI4(next(), a, b),
	addnv: (a, b) => addNI4(next(), b, a),
	div: (a, b) => divI4(next(), a, b),
	divvn: (a, b) => divNI4(next(), a, b),
	divnv: (a, b) => divI4(null, uniform(a), b),
	modi: (a, b) => fmod4(next(), a, b),
	modivn: (a, b) => fmodN4(next(), a, b),
	modinv: (a, b) => fmod4(null, uniform(a), b),
	mul: (a, b) => mulI4(next(), a, b),
	mulvn: (a, b) => mulNI4(next(), a, b),
	mulnv: (a, b) => mulNI4(next(), b, a),
	sub: (a, b) => subI4(next(), a, b),
	subvn: (a, b) => subNI4(next(), a, b),
	subnv: (a, b) => subI4(null, uniform(a), b),
	bitand: (a, b) => bitAndI4(next(), a, b),
	lshift: (a, b) => lshiftI4(next(), a, b),
	lshiftvn: (a, b) => lshiftNI4(next(), a, b),
	bitnot1: (a) => bitNotI4(next(), a),
	bitor: (a, b) => bitOrI4(next(), a, b),
	rshift: (a, b) => rshiftI4(next(), a, b),
	rshiftvn: (a, b) => rshiftNI4(next(), a, b),
	bitxor: (a, b) => bitXorI4(next(), a, b),
};
