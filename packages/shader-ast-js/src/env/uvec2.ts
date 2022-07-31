import { addNU2, addU2 } from "@thi.ng/vectors/addi";
import { bitAndU2 } from "@thi.ng/vectors/bit-and";
import { bitNotU2 } from "@thi.ng/vectors/bit-not";
import { bitOrU2 } from "@thi.ng/vectors/bit-or";
import { bitXorU2 } from "@thi.ng/vectors/bit-xor";
import { divNU2, divU2 } from "@thi.ng/vectors/divi";
import { fmod2 } from "@thi.ng/vectors/fmod";
import { fmodN2 } from "@thi.ng/vectors/fmodn";
import { lshiftU2 } from "@thi.ng/vectors/lshift";
import { mulNU2, mulU2 } from "@thi.ng/vectors/muli";
import { rshiftU2 } from "@thi.ng/vectors/rshift";
import { subNU2, subU2 } from "@thi.ng/vectors/subi";
import type { JSBuiltinsIntVec } from "../api.js";
import { VEC2 } from "./vec2.js";

export const UVEC2: JSBuiltinsIntVec = {
	...VEC2,
	add: (a, b) => addU2([], a, b),
	addvn: (a, b) => addNU2([], a, b),
	addnv: (a, b) => addNU2([], b, a),
	div: (a, b) => divU2([], a, b),
	divvn: (a, b) => divNU2([], a, b),
	divnv: (a, b) => divU2(null, [a, a], b),
	modi: (a, b) => fmod2([], a, b),
	modivn: (a, b) => fmodN2([], a, b),
	modinv: (a, b) => fmod2(null, [a, a], b),
	mul: (a, b) => mulU2([], a, b),
	mulvn: (a, b) => mulNU2([], a, b),
	mulnv: (a, b) => mulNU2([], b, a),
	sub: (a, b) => subU2([], a, b),
	subvn: (a, b) => subNU2([], a, b),
	subnv: (a, b) => subU2(null, [a, a], b),
	bitand: (a, b) => bitAndU2([], a, b),
	lshift: (a, b) => lshiftU2([], a, b),
	bitnot1: (a) => bitNotU2([], a),
	bitor: (a, b) => bitOrU2([], a, b),
	rshift: (a, b) => rshiftU2([], a, b),
	bitxor: (a, b) => bitXorU2([], a, b),
};
