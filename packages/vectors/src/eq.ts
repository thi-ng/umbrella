import type { CompareOp, MultiCompareOp } from "./api";
import { defOp } from "./compile/emit";
import { MATH } from "./compile/templates";

export const [eq, eq2, eq3, eq4] = defOp<MultiCompareOp, CompareOp>(
    MATH("===")
);
