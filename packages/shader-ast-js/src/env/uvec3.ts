import { addNU3, addU3 } from "@thi.ng/vectors/addi";
import { bitAndU3 } from "@thi.ng/vectors/bit-and";
import { bitNotU3 } from "@thi.ng/vectors/bit-not";
import { bitOrU3 } from "@thi.ng/vectors/bit-or";
import { bitXorU3 } from "@thi.ng/vectors/bit-xor";
import { divNU3, divU3 } from "@thi.ng/vectors/divi";
import { fmod3 } from "@thi.ng/vectors/fmod";
import { fmodN3 } from "@thi.ng/vectors/fmodn";
import { lshiftNU3, lshiftU3 } from "@thi.ng/vectors/lshift";
import { mulNU3, mulU3 } from "@thi.ng/vectors/muli";
import { rshiftNU3, rshiftU3 } from "@thi.ng/vectors/rshift";
import { subNU3, subU3 } from "@thi.ng/vectors/subi";
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
