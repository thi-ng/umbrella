import type { MultiVecOpVV, VecOpVV } from "./api.js";
import { defOp } from "./compile/emit.js";
import { FN2 } from "./compile/templates.js";

export const [pow, pow2, pow3, pow4] = defOp<MultiVecOpVV, VecOpVV>(
	FN2("Math.pow")
);
