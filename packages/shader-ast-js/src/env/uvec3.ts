// SPDX-License-Identifier: Apache-2.0
import { addNU3 } from "@thi.ng/vectors/addnu";
import { addU3 } from "@thi.ng/vectors/addu";
import { bitAndU3 } from "@thi.ng/vectors/bit-andu";
import { bitNotU3 } from "@thi.ng/vectors/bit-notu";
import { bitOrU3 } from "@thi.ng/vectors/bit-oru";
import { bitXorU3 } from "@thi.ng/vectors/bit-xoru";
import { divNU3 } from "@thi.ng/vectors/divnu";
import { divU3 } from "@thi.ng/vectors/divu";
import { fmod3 } from "@thi.ng/vectors/fmod";
import { fmodN3 } from "@thi.ng/vectors/fmodn";
import { lshiftNU3 } from "@thi.ng/vectors/lshiftnu";
import { lshiftU3 } from "@thi.ng/vectors/lshiftu";
import { mulNU3 } from "@thi.ng/vectors/mulnu";
import { mulU3 } from "@thi.ng/vectors/mulu";
import { rshiftNU3 } from "@thi.ng/vectors/rshiftnu";
import { rshiftU3 } from "@thi.ng/vectors/rshiftu";
import { subNU3 } from "@thi.ng/vectors/subnu";
import { subU3 } from "@thi.ng/vectors/subu";
import type { JSBuiltinsIntVec } from "../api.js";
import { POOL_UVEC3 } from "../pool.js";
import { VEC3 } from "./vec3.js";

const { next, uniform } = POOL_UVEC3;

export const UVEC3: JSBuiltinsIntVec = {
	...VEC3(POOL_UVEC3),
	add: (a, b) => addU3(next(), a, b),
	addvn: (a, b) => addNU3(next(), a, b),
	addnv: (a, b) => addNU3(next(), b, a),
	div: (a, b) => divU3(next(), a, b),
	divvn: (a, b) => divNU3(next(), a, b),
	divnv: (a, b) => divU3(null, uniform(a), b),
	modi: (a, b) => fmod3(next(), a, b),
	modivn: (a, b) => fmodN3(next(), a, b),
	modinv: (a, b) => fmod3(null, uniform(a), b),
	mul: (a, b) => mulU3(next(), a, b),
	mulvn: (a, b) => mulNU3(next(), a, b),
	mulnv: (a, b) => mulNU3(next(), b, a),
	sub: (a, b) => subU3(next(), a, b),
	subvn: (a, b) => subNU3(next(), a, b),
	subnv: (a, b) => subU3(null, uniform(a), b),
	bitand: (a, b) => bitAndU3(next(), a, b),
	lshift: (a, b) => lshiftU3(next(), a, b),
	lshiftvn: (a, b) => lshiftNU3(next(), a, b),
	bitnot1: (a) => bitNotU3(next(), a),
	bitor: (a, b) => bitOrU3(next(), a, b),
	rshift: (a, b) => rshiftU3(next(), a, b),
	rshiftvn: (a, b) => rshiftNU3(next(), a, b),
	bitxor: (a, b) => bitXorU3(next(), a, b),
};
