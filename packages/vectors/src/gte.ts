import type { CompareOp, MultiCompareOp } from "./api";
import { defOp } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [gte, gte2, gte3, gte4] = defOp<MultiCompareOp, CompareOp>(
    MATH(">=")
);
