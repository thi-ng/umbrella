import type { CompareOp, MultiCompareOp } from "./api.js";
import { defOp } from "./compile/emit.js";
import { MATH } from "./compile/templates.js";

export const [neq, neq2, neq3, neq4] = defOp<MultiCompareOp, CompareOp>(
	MATH("!==")
);
