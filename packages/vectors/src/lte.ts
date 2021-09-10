import type { CompareOp, MultiCompareOp } from "./api";
import { defOp } from "./compile/emit";
import { MATH } from "./compile/templates";

export const [lte, lte2, lte3, lte4] = defOp<MultiCompareOp, CompareOp>(
    MATH("<=")
);
