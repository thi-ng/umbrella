import type { CompareOp, MultiCompareOp } from "./api";
import { defOp } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [neq, neq2, neq3, neq4] = defOp<MultiCompareOp, CompareOp>(
    MATH("!==")
);
