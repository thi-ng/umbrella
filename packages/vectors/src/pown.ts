import type { MultiVecOpVN, VecOpVN } from "./api.js";
import { defOp } from "./compile/emit.js";
import { ARGS_VN, FN_N } from "./compile/templates.js";

export const [powN, powN2, powN3, powN4] = defOp<MultiVecOpVN, VecOpVN>(
	FN_N("Math.pow"),
	ARGS_VN
);
