import type { CompareOp, MultiCompareOp } from "./api";
import { defOp } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [lte, lte2, lte3, lte4] = defOp<MultiCompareOp, CompareOp>(
    MATH("<=")
);
