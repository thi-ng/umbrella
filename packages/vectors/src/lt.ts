import type { CompareOp, MultiCompareOp } from "./api";
import { defOp } from "./compile/emit";
import { MATH } from "./compile/templates";

export const [lt, lt2, lt3, lt4] = defOp<MultiCompareOp, CompareOp>(MATH("<"));
