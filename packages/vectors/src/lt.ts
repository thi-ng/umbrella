import type { CompareOp, MultiCompareOp } from "./api.js";
import { defOp } from "./compile/emit.js";
import { MATH } from "./compile/templates.js";

export const [lt, lt2, lt3, lt4] = defOp<MultiCompareOp, CompareOp>(MATH("<"));
