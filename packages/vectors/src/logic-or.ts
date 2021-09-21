import type { BVecOpVN, BVecOpVV, MultiBVecOpVN, MultiBVecOpVV } from "./api";
import { defOp } from "./compile/emit";
import { ARGS_VN, MATH, MATH_N } from "./compile/templates";

export const [logicOr, logicOr2, logicOr3, logicOr4] = defOp<
    MultiBVecOpVV,
    BVecOpVV
>(MATH("||"));

export const [logicOrN, logicOrN2, logicOrN3, logicOrN4] = defOp<
    MultiBVecOpVN,
    BVecOpVN
>(MATH_N("||"), ARGS_VN);
