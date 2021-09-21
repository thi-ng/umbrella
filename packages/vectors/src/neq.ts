import type { CompareOp, MultiCompareOp } from "./api";
import { defOp } from "./compile/emit";
import { MATH } from "./compile/templates";

export const [neq, neq2, neq3, neq4] = defOp<MultiCompareOp, CompareOp>(
    MATH("!==")
);
