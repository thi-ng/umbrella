import type { CompareOp, MultiCompareOp } from "./api";
import { defOp } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [lt, lt2, lt3, lt4] = defOp<MultiCompareOp, CompareOp>(MATH("<"));
