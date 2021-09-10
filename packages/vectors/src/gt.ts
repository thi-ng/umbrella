import type { CompareOp, MultiCompareOp } from "./api";
import { defOp } from "./compile/emit";
import { MATH } from "./compile/templates";

export const [gt, gt2, gt3, gt4] = defOp<MultiCompareOp, CompareOp>(MATH(">"));
