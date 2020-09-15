import type { CompareOp, MultiCompareOp } from "./api";
import { defOp } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [eq, eq2, eq3, eq4] = defOp<MultiCompareOp, CompareOp>(
    MATH("===")
);
