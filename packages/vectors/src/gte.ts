import type { CompareOp, MultiCompareOp } from "./api.js";
import { defOp } from "./compile/emit.js";
import { MATH } from "./compile/templates.js";

export const [gte, gte2, gte3, gte4] = defOp<MultiCompareOp, CompareOp>(
	MATH(">=")
);
