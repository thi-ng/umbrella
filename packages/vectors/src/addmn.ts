import type { MultiVecOpVVN, VecOpVVN } from "./api.js";
import { defOp } from "./compile/emit.js";
import { ARGS_VVN, MATH2_N } from "./compile/templates.js";

/**
 * Returns `out = (a + b) * n`.
 */
export const [addmN, addmN2, addmN3, addmN4] = defOp<MultiVecOpVVN, VecOpVVN>(
	MATH2_N("+", "*"),
	ARGS_VVN
);
