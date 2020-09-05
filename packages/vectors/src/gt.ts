import type { CompareOp, MultiCompareOp } from "./api";
import { defOp } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [gt, gt2, gt3, gt4] = defOp<MultiCompareOp, CompareOp>(MATH(">"));
