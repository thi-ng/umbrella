import type { CompareOp, MultiCompareOp } from "./api.js";
import { defOp } from "./compile/emit.js";
import { MATH } from "./compile/templates.js";

export const [lte, lte2, lte3, lte4] = defOp<MultiCompareOp, CompareOp>(
	MATH("<=")
);
