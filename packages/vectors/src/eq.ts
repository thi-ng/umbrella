import type { CompareOp, MultiCompareOp } from "./api.js";
import { defOp } from "./compile/emit.js";
import { MATH } from "./compile/templates.js";

export const [eq, eq2, eq3, eq4] = defOp<MultiCompareOp, CompareOp>(
    MATH("===")
);
