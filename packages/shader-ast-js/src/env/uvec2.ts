// SPDX-License-Identifier: Apache-2.0
import { addNU2 } from "@thi.ng/vectors/addnu";
import { addU2 } from "@thi.ng/vectors/addu";
import { bitAndU2 } from "@thi.ng/vectors/bit-andu";
import { bitNotU2 } from "@thi.ng/vectors/bit-notu";
import { bitOrU2 } from "@thi.ng/vectors/bit-oru";
import { bitXorU2 } from "@thi.ng/vectors/bit-xoru";
import { divNU2 } from "@thi.ng/vectors/divnu";
import { divU2 } from "@thi.ng/vectors/divu";
import { fmod2 } from "@thi.ng/vectors/fmod";
import { fmodN2 } from "@thi.ng/vectors/fmodn";
import { lshiftNU2 } from "@thi.ng/vectors/lshiftnu";
import { lshiftU2 } from "@thi.ng/vectors/lshiftu";
import { mulNU2 } from "@thi.ng/vectors/mulnu";
import { mulU2 } from "@thi.ng/vectors/mulu";
import { rshiftNU2 } from "@thi.ng/vectors/rshiftnu";
import { rshiftU2 } from "@thi.ng/vectors/rshiftu";
import { subNU2 } from "@thi.ng/vectors/subnu";
import { subU2 } from "@thi.ng/vectors/subu";
import type { JSBuiltinsIntVec } from "../api.js";
import { POOL_UVEC2 } from "../pool.js";
import { VEC2 } from "./vec2.js";

const { next, uniform } = POOL_UVEC2;

export const UVEC2: JSBuiltinsIntVec = {
	...VEC2(POOL_UVEC2),
	add: (a, b) => addU2(next(), a, b),
	addvn: (a, b) => addNU2(next(), a, b),
	addnv: (a, b) => addNU2(next(), b, a),
	div: (a, b) => divU2(next(), a, b),
	divvn: (a, b) => divNU2(next(), a, b),
	divnv: (a, b) => divU2(null, uniform(a), b),
	modi: (a, b) => fmod2(next(), a, b),
	modivn: (a, b) => fmodN2(next(), a, b),
	modinv: (a, b) => fmod2(null, uniform(a), b),
	mul: (a, b) => mulU2(next(), a, b),
	mulvn: (a, b) => mulNU2(next(), a, b),
	mulnv: (a, b) => mulNU2(next(), b, a),
	sub: (a, b) => subU2(next(), a, b),
	subvn: (a, b) => subNU2(next(), a, b),
	subnv: (a, b) => subU2(null, uniform(a), b),
	bitand: (a, b) => bitAndU2(next(), a, b),
	lshift: (a, b) => lshiftU2(next(), a, b),
	lshiftvn: (a, b) => lshiftNU2(next(), a, b),
	bitnot1: (a) => bitNotU2(next(), a),
	bitor: (a, b) => bitOrU2(next(), a, b),
	rshift: (a, b) => rshiftU2(next(), a, b),
	rshiftvn: (a, b) => rshiftNU2(next(), a, b),
	bitxor: (a, b) => bitXorU2(next(), a, b),
};
