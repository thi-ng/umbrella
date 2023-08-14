import { add22 } from "@thi.ng/matrices/add";
import { addN22 } from "@thi.ng/matrices/addn";
import { div22 } from "@thi.ng/matrices/div";
import { divN22 } from "@thi.ng/matrices/divn";
import { mul22 } from "@thi.ng/matrices/mul";
import { mulM22 } from "@thi.ng/matrices/mulm";
import { mulN22 } from "@thi.ng/matrices/muln";
import { mulV22 } from "@thi.ng/matrices/mulv";
import { mulVM22 } from "@thi.ng/matrices/mulvm";
import { sub22 } from "@thi.ng/matrices/sub";
import { subN22 } from "@thi.ng/matrices/subn";
import { neg } from "@thi.ng/vectors/neg";
import type { JSBuiltinsMat } from "../api.js";
import { POOL_VEC4 } from "../pool.js";

const { next, uniform } = POOL_VEC4;

export const MAT2: JSBuiltinsMat = {
	add: (a, b) => add22(next(), a, b),
	addnv: (a, b) => addN22(next(), b, a),
	addvn: (a, b) => addN22(next(), a, b),
	dec: (a) => subN22(next(), a, 1),
	div: (a, b) => div22(next(), a, b),
	divnv: (a, b) => div22(null, uniform(a), b),
	divvn: (a, b) => divN22(next(), a, b),
	idx: (a, b) => [a[b * 2], a[b * 2 + 1]],
	inc: (a) => addN22(next(), a, 1),
	mul: (a, b) => mul22(next(), a, b),
	mulm: (a, b) => mulM22(next(), a, b),
	mulmv: (a, b) => mulV22(next(), a, b),
	mulnv: (a, b) => mulN22(next(), b, a),
	mulvm: (a, b) => mulVM22(next(), a, b),
	mulvn: (a, b) => mulN22(next(), a, b),
	sub: (a, b) => sub22(next(), a, b),
	sub1: (a) => neg(next(), a),
	subnv: (a, b) => sub22(null, uniform(a), b),
	subvn: (a, b) => subN22(next(), a, b),
};
