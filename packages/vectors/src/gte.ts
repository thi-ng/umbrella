import type { CompareOp, MultiCompareOp } from "./api";
import { defOp } from "./compile/emit";
import { MATH } from "./compile/templates";

export const [gte, gte2, gte3, gte4] = defOp<MultiCompareOp, CompareOp>(
    MATH(">=")
);
