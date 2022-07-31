import type { MultiVecOpVV, VecOpVV } from "./api.js";
import { defOp } from "./compile/emit.js";
import { FN2 } from "./compile/templates.js";

export const [max, max2, max3, max4] = defOp<MultiVecOpVV, VecOpVV>(
	FN2("Math.max")
);
